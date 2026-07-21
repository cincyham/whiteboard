import styles from './Selected.module.scss';
import {
    ShapeAppearance,
    BaseShape,
    BaseShapeGroup,
    ShapeElement,
} from '@/types/shapeTypes';

function updateAppearance(
    prevShapes: ShapeElement[],
    patch: Partial<ShapeAppearance>,
): ShapeElement[] {
    return prevShapes.map(shp => {
        if (shp instanceof BaseShapeGroup) return shp;
        return new BaseShape({
            ...shp,
            appearance: { ...shp.appearance, ...patch },
        });
    });
}

export default function Selected({
    hide,
    selectedShapes,
    setSelectedShapes,
}: {
    hide: boolean;
    selectedShapes: ShapeElement[];
    setSelectedShapes: React.Dispatch<React.SetStateAction<ShapeElement[]>>;
}) {
    if (hide || selectedShapes.length === 0) return null;

    // TODO: There is some weird logic here because ShapeGroups aren't properly implemented yet. Come back and adjust this after ShapeGroups are implemented.

    const update = (patch: Partial<ShapeAppearance>) =>
        setSelectedShapes(prev => updateAppearance(prev, patch));

    const first = selectedShapes.find(
        (s): s is BaseShape => s instanceof BaseShape,
    );

    const appearance = first?.appearance;
    const stroke = appearance?.stroke ?? '#ffffff';
    const fill = appearance?.fill ?? 'transparent';
    const strokeWidth = appearance?.strokeWidth ?? 4;
    const isTransparent = fill === 'transparent';

    return (
        <div className={styles.selected}>
            <div className={styles.row}>
                <label className={styles.label}>Stroke</label>
                <input
                    type='color'
                    value={stroke}
                    onChange={e => update({ stroke: e.target.value })}
                />
            </div>
            <div className={styles.row}>
                <label className={styles.label}>Fill</label>
                <input
                    type='color'
                    disabled={isTransparent}
                    value={isTransparent ? '#000000' : fill}
                    onChange={e => update({ fill: e.target.value })}
                />
                <input
                    type='checkbox'
                    checked={isTransparent}
                    onChange={e =>
                        update({
                            fill: e.target.checked ? 'transparent' : '#000000',
                        })
                    }
                />
            </div>
            <div className={styles.row}>
                <label className={styles.label}>Width</label>
                <input
                    type='number'
                    min={1}
                    max={20}
                    value={strokeWidth}
                    onChange={e =>
                        update({ strokeWidth: Number(e.target.value) })
                    }
                    className={styles.widthInput}
                />
            </div>
        </div>
    );
}

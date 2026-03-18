import { useCallback, useEffect, useRef, useState } from 'react';
import type { RefObject } from 'react';

interface DragScrollState {
    isDragging: boolean;
    startX: number;
    scrollLeft: number;
}

/**
 * Hook para carrousel horizontal arrastável com mouse.
 *
 * Uso:
 *   const { ref, isDragging } = useDragScroll<HTMLDivElement>();
 *   <div ref={ref} className={isDragging ? 'cursor-grabbing' : 'cursor-grab'} />
 */
export function useDragScroll<T extends HTMLElement>(): {
    ref: RefObject<T | null>;
    isDragging: boolean;
} {
    const ref = useRef<T>(null);
    const [isDragging, setIsDragging] = useState(false);
    const stateRef = useRef<DragScrollState>({
        isDragging: false,
        startX: 0,
        scrollLeft: 0,
    });

    const handleMouseDown = useCallback((e: MouseEvent) => {
        const el = ref.current;
        if (!el) return;
        stateRef.current = { isDragging: true, startX: e.pageX - el.offsetLeft, scrollLeft: el.scrollLeft };
        setIsDragging(true);
        el.style.cursor = 'grabbing';
        el.style.userSelect = 'none';
    }, []);

    const handleMouseMove = useCallback((e: MouseEvent) => {
        if (!stateRef.current.isDragging) return;
        const el = ref.current;
        if (!el) return;
        e.preventDefault();
        const x = e.pageX - el.offsetLeft;
        el.scrollLeft = stateRef.current.scrollLeft - (x - stateRef.current.startX) * 1.5;
    }, []);

    const handleMouseUp = useCallback(() => {
        const el = ref.current;
        if (!el) return;
        stateRef.current.isDragging = false;
        setIsDragging(false);
        el.style.cursor = 'grab';
        el.style.userSelect = '';
    }, []);

    const handleMouseLeave = useCallback(() => {
        if (stateRef.current.isDragging) handleMouseUp();
    }, [handleMouseUp]);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        el.style.cursor = 'grab';
        el.addEventListener('mousedown', handleMouseDown);
        el.addEventListener('mousemove', handleMouseMove);
        el.addEventListener('mouseup', handleMouseUp);
        el.addEventListener('mouseleave', handleMouseLeave);
        return () => {
            el.removeEventListener('mousedown', handleMouseDown);
            el.removeEventListener('mousemove', handleMouseMove);
            el.removeEventListener('mouseup', handleMouseUp);
            el.removeEventListener('mouseleave', handleMouseLeave);
        };
    }, [handleMouseDown, handleMouseMove, handleMouseUp, handleMouseLeave]);

    return { ref, isDragging };
}

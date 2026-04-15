import { ChevronLeft, ChevronRight, Maximize2, Minus, Plus, RotateCcw, X } from "lucide-react";
import { useEffect, useState, useCallback, useRef } from "react";

const MIN_ZOOM = 1;
const MAX_ZOOM = 4;
const ZOOM_STEP = 0.35;

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

export function ImageModal({
  photos,
  initialIndex,
  isOpen,
  onClose,
}: {
  photos: string[];
  initialIndex: number;
  isOpen: boolean;
  onClose: () => void;
}) {
  const [current, setCurrent] = useState(initialIndex);
  const [zoom, setZoom] = useState(MIN_ZOOM);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [isPanning, setIsPanning] = useState(false);
  const panStart = useRef({ x: 0, y: 0 });
  const dragMoved = useRef(false);

  const resetView = useCallback(() => {
    setZoom(MIN_ZOOM);
    setOffset({ x: 0, y: 0 });
    setIsPanning(false);
    dragMoved.current = false;
  }, []);

  // Sync index when modal opens
  useEffect(() => {
    setCurrent(initialIndex);
    resetView();
  }, [initialIndex, isOpen, resetView]);

  useEffect(() => {
    resetView();
  }, [current, resetView]);

  const prev = useCallback(
    () => setCurrent((c) => (c - 1 + photos.length) % photos.length),
    [photos.length],
  );
  const next = useCallback(
    () => setCurrent((c) => (c + 1) % photos.length),
    [photos.length],
  );

  const zoomIn = useCallback(() => {
    setZoom((z) => Math.min(MAX_ZOOM, Number((z + ZOOM_STEP).toFixed(2))));
  }, []);

  const zoomOut = useCallback(() => {
    setZoom((z) => Math.max(MIN_ZOOM, Number((z - ZOOM_STEP).toFixed(2))));
  }, []);

  useEffect(() => {
    if (zoom === MIN_ZOOM) {
      setOffset({ x: 0, y: 0 });
    }
  }, [zoom]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
      if (e.key === "+" || e.key === "=") zoomIn();
      if (e.key === "-") zoomOut();
      if (e.key === "0") resetView();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [isOpen, onClose, prev, next, resetView, zoomIn, zoomOut]);

  if (!isOpen) return null;

  const toggleZoom = () => {
    setZoom((z) => {
      const nextZoom = z === MIN_ZOOM ? 2 : MIN_ZOOM;
      if (nextZoom === MIN_ZOOM) {
        setOffset({ x: 0, y: 0 });
      }
      return nextZoom;
    });
  };

  const handleWheel = (e: React.WheelEvent<HTMLImageElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.deltaY < 0) {
      zoomIn();
      return;
    }
    zoomOut();
  };

  const handlePointerDown = (e: React.PointerEvent<HTMLImageElement>) => {
    e.stopPropagation();
    if (zoom <= MIN_ZOOM) return;
    e.currentTarget.setPointerCapture(e.pointerId);
    setIsPanning(true);
    panStart.current = {
      x: e.clientX - offset.x,
      y: e.clientY - offset.y,
    };
    dragMoved.current = false;
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLImageElement>) => {
    if (!isPanning || zoom <= MIN_ZOOM) return;

    const maxPanX = window.innerWidth * (zoom - 1) * 0.4;
    const maxPanY = window.innerHeight * (zoom - 1) * 0.4;
    const nextX = clamp(e.clientX - panStart.current.x, -maxPanX, maxPanX);
    const nextY = clamp(e.clientY - panStart.current.y, -maxPanY, maxPanY);

    setOffset({ x: nextX, y: nextY });
    dragMoved.current = true;
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLImageElement>) => {
    if (e.currentTarget.hasPointerCapture(e.pointerId)) {
      e.currentTarget.releasePointerCapture(e.pointerId);
    }
    setIsPanning(false);
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/88 backdrop-blur-md p-4 md:p-10 animate-in fade-in duration-300"
      onClick={onClose}
    >
      <button
        className="absolute top-6 right-6 p-2.5 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors z-[110] border border-white/15"
        onClick={onClose}
      >
        <X className="w-6 h-6" />
      </button>

      {photos.length > 1 && (
        <div
          className="absolute top-6 left-1/2 -translate-x-1/2 z-[110] px-3 py-1 rounded-full bg-white/10 text-white/80 text-sm font-medium border border-white/10"
        >
          {current + 1} / {photos.length}
        </div>
      )}

      <div className="absolute top-6 left-6 z-[110] flex items-center gap-2">
        <button
          className="p-2 rounded-lg bg-white/10 text-white hover:bg-white/20 transition-colors border border-white/15"
          onClick={(e) => {
            e.stopPropagation();
            zoomOut();
          }}
          aria-label="Zoom out"
        >
          <Minus className="w-4 h-4" />
        </button>
        <div className="px-2.5 py-1 rounded-lg bg-white/10 text-white/90 text-sm font-medium border border-white/15 min-w-14 text-center">
          {Math.round(zoom * 100)}%
        </div>
        <button
          className="p-2 rounded-lg bg-white/10 text-white hover:bg-white/20 transition-colors border border-white/15"
          onClick={(e) => {
            e.stopPropagation();
            zoomIn();
          }}
          aria-label="Zoom in"
        >
          <Plus className="w-4 h-4" />
        </button>
        <button
          className="p-2 rounded-lg bg-white/10 text-white hover:bg-white/20 transition-colors border border-white/15"
          onClick={(e) => {
            e.stopPropagation();
            resetView();
          }}
          aria-label="Reset zoom"
        >
          <RotateCcw className="w-4 h-4" />
        </button>
      </div>

      <div className="relative max-w-7xl w-full h-full flex items-center justify-center">
        <img
          key={current}
          src={photos[current]}
          alt={`Photo ${current + 1}`}
          className={`max-w-full max-h-full object-contain rounded-2xl shadow-2xl select-none touch-none ${
            zoom > MIN_ZOOM ? "cursor-grab" : "cursor-zoom-in"
          } ${isPanning ? "cursor-grabbing" : ""}`}
          style={{
            transform: `translate(${offset.x}px, ${offset.y}px) scale(${zoom})`,
            transition: isPanning ? "none" : "transform 180ms ease",
          }}
          draggable={false}
          onWheel={handleWheel}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
          onLostPointerCapture={() => setIsPanning(false)}
          onClick={(e) => {
            e.stopPropagation();
            if (dragMoved.current) {
              dragMoved.current = false;
              return;
            }
            toggleZoom();
          }}
        />

        {photos.length > 1 && (
          <>
            <button
              onClick={(e) => {
                e.stopPropagation();
                prev();
              }}
              className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/10 border border-white/15 flex items-center justify-center hover:bg-white/20 transition-colors"
            >
              <ChevronLeft className="w-5 h-5 text-white" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                next();
              }}
              className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/10 border border-white/15 flex items-center justify-center hover:bg-white/20 transition-colors"
            >
              <ChevronRight className="w-5 h-5 text-white" />
            </button>

            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5">
              {photos.map((_, i) => (
                <button
                  key={i}
                  onClick={(e) => {
                    e.stopPropagation();
                    setCurrent(i);
                  }}
                  className={`rounded-full transition-all duration-200 ${
                    i === current
                      ? "w-4 h-1.5 bg-white"
                      : "w-1.5 h-1.5 bg-white/40 hover:bg-white/60"
                  }`}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export function PhotoGallery({
  photos,
  rootPath,
  onImageClick,
}: {
  photos: string[];
  rootPath: string;
  onImageClick: (srcs: string[], index: number) => void;
}) {
  const [current, setCurrent] = useState(0);
  const allSrcs = photos.map((p) => `/assets/projects/${rootPath}/${p}`);
  const imageSrc = allSrcs[current];

  return (
    <div
      className="relative w-full rounded-2xl overflow-hidden ui-card group/gallery cursor-zoom-in"
      style={{ aspectRatio: "16/9" }}
      onClick={() => onImageClick(allSrcs, current)}
    >
      <img
        key={current}
        src={imageSrc}
        alt={`Screenshot ${current + 1}`}
        loading="lazy"
        decoding="async"
        className="w-full h-full object-contain transition-opacity duration-300"
        onError={(e) => {
          (e.target as HTMLImageElement).src = "/placeholder.svg";
        }}
      />

      <div className="absolute inset-0 bg-black/0 group-hover/gallery:bg-black/12 transition-colors flex items-center justify-center pointer-events-none">
        <Maximize2 className="w-8 h-8 text-white opacity-0 group-hover/gallery:opacity-100 transition-opacity drop-shadow-md" />
      </div>

      {photos.length > 1 && (
        <>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setCurrent((c) => (c - 1 + photos.length) % photos.length);
            }}
            className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/75 dark:bg-black/55 border border-black/10 dark:border-white/12 flex items-center justify-center hover:bg-white dark:hover:bg-black/70 transition-colors z-10"
          >
            <ChevronLeft className="w-4 h-4 text-slate-700 dark:text-white/80" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setCurrent((c) => (c + 1) % photos.length);
            }}
            className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/75 dark:bg-black/55 border border-black/10 dark:border-white/12 flex items-center justify-center hover:bg-white dark:hover:bg-black/70 transition-colors z-10"
          >
            <ChevronRight className="w-4 h-4 text-slate-700 dark:text-white/80" />
          </button>

          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1 z-10">
            {photos.map((_, i) => (
              <button
                key={i}
                onClick={(e) => {
                  e.stopPropagation();
                  setCurrent(i);
                }}
                className={`rounded-full transition-all duration-200 ${
                  i === current
                    ? "w-3 h-1 bg-white"
                    : "w-1 h-1 bg-white/50 hover:bg-white/70"
                }`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

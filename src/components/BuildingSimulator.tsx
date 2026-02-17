import { useState, useRef, useCallback, useEffect } from 'react';
import { Stage, Layer, Image as KonvaImage, Line } from 'react-konva';
import { motion } from 'framer-motion';
import { FiUpload, FiEdit3, FiTrash2, FiDownload, FiEye, FiEyeOff, FiRotateCcw } from 'react-icons/fi';
import { BsEraserFill } from 'react-icons/bs';
import './BuildingSimulator.css';

// ─── Types ───────────────────────────────────────────────────────────────────
interface DrawnLine {
    points: number[];
    strokeWidth: number;
    color: string;
    globalCompositeOperation: GlobalCompositeOperation;
}

// ─── Predefined Colors ──────────────────────────────────────────────────────
const COLORS = [
    { name: 'Krem', value: '#F5F0E1' },
    { name: 'Bej', value: '#D4C5A9' },
    { name: 'Terrakota', value: '#C17839' },
    { name: 'Taş Gri', value: '#9E9E9E' },
    { name: 'Antrasit', value: '#424242' },
    { name: 'Beyaz', value: '#FAFAFA' },
    { name: 'Sıcak Sarı', value: '#F0D58C' },
    { name: 'Kiremit', value: '#B85C38' },
    { name: 'Açık Gri', value: '#BDBDBD' },
    { name: 'Koyu Kahve', value: '#5D4037' },
    { name: 'Pastel Yeşil', value: '#A8C69F' },
    { name: 'Gökyüzü', value: '#90CAF9' },
];

// ─── Predefined Textures (CSS-generated patterns) ───────────────────────────
const TEXTURES = [
    {
        name: 'Mantolama',
        css: 'linear-gradient(135deg, #D4C5A9 25%, #C7B898 25%, #C7B898 50%, #D4C5A9 50%, #D4C5A9 75%, #C7B898 75%)',
        color: '#D4C5A9',
        secondaryColor: '#C7B898',
    },
    {
        name: 'Taş Kaplama',
        css: 'linear-gradient(45deg, #8D8D8D 25%, transparent 25%), linear-gradient(-45deg, #8D8D8D 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #8D8D8D 75%), linear-gradient(-45deg, transparent 75%, #8D8D8D 75%)',
        color: '#9E9E9E',
        secondaryColor: '#757575',
    },
    {
        name: 'Tuğla',
        css: 'linear-gradient(0deg, #8B4513 48%, #2F1810 48%, #2F1810 52%, #8B4513 52%)',
        color: '#A0522D',
        secondaryColor: '#8B4513',
    },
    {
        name: 'Sıva',
        css: 'linear-gradient(135deg, #F5F5F0 0%, #E8E4DB 100%)',
        color: '#F0EDE5',
        secondaryColor: '#E8E4DB',
    },
];

// ─── Texture Generator ──────────────────────────────────────────────────────
function generateTextureCanvas(
    textureIndex: number,
    width: number,
    height: number
): HTMLCanvasElement {
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');
    if (!ctx) return canvas;

    const tex = TEXTURES[textureIndex];

    switch (textureIndex) {
        case 0: // Mantolama – stucco-like noise
            ctx.fillStyle = tex.color;
            ctx.fillRect(0, 0, width, height);
            for (let i = 0; i < width * height * 0.3; i++) {
                const x = Math.random() * width;
                const y = Math.random() * height;
                const size = Math.random() * 2 + 0.5;
                ctx.fillStyle = `rgba(0,0,0,${Math.random() * 0.08})`;
                ctx.fillRect(x, y, size, size);
            }
            for (let i = 0; i < width * height * 0.15; i++) {
                const x = Math.random() * width;
                const y = Math.random() * height;
                const size = Math.random() * 1.5 + 0.5;
                ctx.fillStyle = `rgba(255,255,255,${Math.random() * 0.06})`;
                ctx.fillRect(x, y, size, size);
            }
            break;

        case 1: // Taş Kaplama – stone block pattern
            ctx.fillStyle = '#b0a89a';
            ctx.fillRect(0, 0, width, height);
            {
                const stoneW = 60, stoneH = 35, gap = 3;
                for (let row = 0; row * (stoneH + gap) < height + stoneH; row++) {
                    const offset = row % 2 === 0 ? 0 : stoneW / 2;
                    for (let col = -1; col * (stoneW + gap) < width + stoneW; col++) {
                        const x = col * (stoneW + gap) + offset;
                        const y = row * (stoneH + gap);
                        const shade = 140 + Math.random() * 40;
                        ctx.fillStyle = `rgb(${shade + 10}, ${shade + 5}, ${shade - 10})`;
                        ctx.fillRect(x, y, stoneW, stoneH);
                        // subtle noise on stone
                        for (let n = 0; n < 30; n++) {
                            ctx.fillStyle = `rgba(0,0,0,${Math.random() * 0.06})`;
                            ctx.fillRect(x + Math.random() * stoneW, y + Math.random() * stoneH, 2, 2);
                        }
                    }
                }
            }
            break;

        case 2: // Tuğla – brick pattern
            ctx.fillStyle = '#6B3A2A';
            ctx.fillRect(0, 0, width, height);
            {
                const brickW = 50, brickH = 22, gap = 3;
                for (let row = 0; row * (brickH + gap) < height + brickH; row++) {
                    const offset = row % 2 === 0 ? 0 : brickW / 2 + gap / 2;
                    for (let col = -1; col * (brickW + gap) < width + brickW; col++) {
                        const x = col * (brickW + gap) + offset;
                        const y = row * (brickH + gap);
                        const r = 160 + Math.random() * 30;
                        const g = 70 + Math.random() * 20;
                        const b = 40 + Math.random() * 15;
                        ctx.fillStyle = `rgb(${r}, ${g}, ${b})`;
                        ctx.fillRect(x, y, brickW, brickH);
                        for (let n = 0; n < 15; n++) {
                            ctx.fillStyle = `rgba(0,0,0,${Math.random() * 0.05})`;
                            ctx.fillRect(x + Math.random() * brickW, y + Math.random() * brickH, 1.5, 1.5);
                        }
                    }
                }
            }
            break;

        case 3: // Sıva – smooth plaster
            ctx.fillStyle = tex.color;
            ctx.fillRect(0, 0, width, height);
            for (let i = 0; i < width * height * 0.1; i++) {
                const x = Math.random() * width;
                const y = Math.random() * height;
                ctx.fillStyle = `rgba(0,0,0,${Math.random() * 0.03})`;
                ctx.fillRect(x, y, Math.random() * 3, Math.random() * 3);
            }
            break;
    }
    return canvas;
}

// ─── Component ──────────────────────────────────────────────────
function BuildingSimulator() {
    // State
    const [uploadedImage, setUploadedImage] = useState<HTMLImageElement | null>(null);
    const [lines, setLines] = useState<DrawnLine[]>([]);
    const [isDrawing, setIsDrawing] = useState(false);
    const [tool, setTool] = useState<'brush' | 'eraser'>('brush');
    const [brushSize, setBrushSize] = useState(30);
    const [opacity, setOpacity] = useState(0.55);
    const [selectedColor, setSelectedColor] = useState(COLORS[0].value);
    const [selectedTexture, setSelectedTexture] = useState<number | null>(null);
    const [showOverlay, setShowOverlay] = useState(true);
    const [stageSize, setStageSize] = useState({ width: 800, height: 500 });
    const [isDragging, setIsDragging] = useState(false);
    const [textureImage, setTextureImage] = useState<HTMLImageElement | null>(null);

    const stageRef = useRef<any>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    // Generate texture image when texture is selected
    useEffect(() => {
        if (selectedTexture === null) {
            setTextureImage(null);
            return;
        }
        const texCanvas = generateTextureCanvas(selectedTexture, 256, 256);
        const img = new Image();
        img.src = texCanvas.toDataURL();
        img.onload = () => setTextureImage(img);
    }, [selectedTexture]);

    // Fit canvas to container
    const fitToContainer = useCallback(() => {
        if (containerRef.current) {
            const rect = containerRef.current.getBoundingClientRect();
            setStageSize({
                width: Math.max(rect.width - 4, 300),
                height: Math.max(rect.height - 4, 300),
            });
        }
    }, []);

    useEffect(() => {
        fitToContainer();
        window.addEventListener('resize', fitToContainer);
        return () => window.removeEventListener('resize', fitToContainer);
    }, [fitToContainer]);

    // Compute image draw dimensions (fit & center)
    const getImageDimensions = useCallback(() => {
        if (!uploadedImage) return { x: 0, y: 0, width: 0, height: 0 };
        const imgRatio = uploadedImage.width / uploadedImage.height;
        const stageRatio = stageSize.width / stageSize.height;
        let drawW: number, drawH: number;
        if (imgRatio > stageRatio) {
            drawW = stageSize.width;
            drawH = stageSize.width / imgRatio;
        } else {
            drawH = stageSize.height;
            drawW = stageSize.height * imgRatio;
        }
        return {
            x: (stageSize.width - drawW) / 2,
            y: (stageSize.height - drawH) / 2,
            width: drawW,
            height: drawH,
        };
    }, [uploadedImage, stageSize]);

    // File upload handler
    const handleFile = useCallback((file: File) => {
        if (!file.type.startsWith('image/')) return;
        const reader = new FileReader();
        reader.onload = (e) => {
            const img = new Image();
            img.onload = () => {
                setUploadedImage(img);
                setLines([]);
            };
            img.src = e.target?.result as string;
        };
        reader.readAsDataURL(file);
    }, []);

    const handleDrop = useCallback(
        (e: React.DragEvent) => {
            e.preventDefault();
            setIsDragging(false);
            const file = e.dataTransfer.files[0];
            if (file) handleFile(file);
        },
        [handleFile]
    );

    const handleFileInput = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            const file = e.target.files?.[0];
            if (file) handleFile(file);
        },
        [handleFile]
    );

    // Drawing handlers
    const getActiveColor = () => {
        if (selectedTexture !== null) return TEXTURES[selectedTexture].color;
        return selectedColor;
    };

    const handleMouseDown = (e: any) => {
        if (!uploadedImage) return;
        setIsDrawing(true);
        const pos = e.target.getStage().getPointerPosition();
        const newLine: DrawnLine = {
            points: [pos.x, pos.y],
            strokeWidth: brushSize,
            color: tool === 'eraser' ? '#000' : getActiveColor(),
            globalCompositeOperation: tool === 'eraser' ? 'destination-out' : 'source-over',
        };
        setLines([...lines, newLine]);
    };

    const handleMouseMove = (e: any) => {
        if (!isDrawing) return;
        const stage = e.target.getStage();
        const point = stage.getPointerPosition();
        const lastLine = lines[lines.length - 1];
        lastLine.points = lastLine.points.concat([point.x, point.y]);
        setLines([...lines.slice(0, -1), lastLine]);
    };

    const handleMouseUp = () => {
        setIsDrawing(false);
    };

    // Undo
    const handleUndo = () => {
        setLines(lines.slice(0, -1));
    };

    // Clear all
    const handleClear = () => {
        setLines([]);
    };

    // Download
    const handleDownload = () => {
        const stage = stageRef.current;
        if (!stage) return;
        const dataURL = stage.toDataURL({ pixelRatio: 2 });
        const link = document.createElement('a');
        link.download = 'bina-simulasyon.png';
        link.href = dataURL;
        link.click();
    };

    // Reset (remove image)
    const handleReset = () => {
        setUploadedImage(null);
        setLines([]);
    };

    const imgDims = getImageDimensions();

    return (
        <section id="simulasyon" className="section simulator-section">
            <div className="container">
                <motion.div
                    className="section-header"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <span className="section-subtitle">Bina Giydirme</span>
                    <h2 className="section-title">
                        Dış Cephe <span className="gradient-text">Simülasyonu</span>
                    </h2>
                    <p className="section-description">
                        Binanızın fotoğrafını yükleyin, farklı kaplama ve renk
                        seçeneklerini anında deneyin.
                    </p>
                </motion.div>

                <motion.div
                    className="simulator-app"
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7, delay: 0.2 }}
                >
                    {/* Canvas Area */}
                    <div className="simulator-canvas-area">
                        <div className="simulator-canvas-wrapper" ref={containerRef}>
                            {!uploadedImage ? (
                                <div
                                    className={`simulator-upload-zone ${isDragging ? 'dragging' : ''}`}
                                    onDragOver={(e) => {
                                        e.preventDefault();
                                        setIsDragging(true);
                                    }}
                                    onDragLeave={() => setIsDragging(false)}
                                    onDrop={handleDrop}
                                    onClick={() => fileInputRef.current?.click()}
                                >
                                    <div className="upload-icon">
                                        <FiUpload />
                                    </div>
                                    <div className="upload-text">
                                        <h3>Bina Fotoğrafını Yükleyin</h3>
                                        <p>Sürükle bırak veya tıklayarak seçin</p>
                                        <p className="upload-hint">JPG, PNG • Maks 10MB</p>
                                    </div>
                                    <input
                                        ref={fileInputRef}
                                        type="file"
                                        accept="image/*"
                                        onChange={handleFileInput}
                                        style={{ display: 'none' }}
                                    />
                                </div>
                            ) : (
                                <Stage
                                    ref={stageRef}
                                    width={stageSize.width}
                                    height={stageSize.height}
                                    onMouseDown={handleMouseDown}
                                    onMousemove={handleMouseMove}
                                    onMouseup={handleMouseUp}
                                    onTouchStart={handleMouseDown}
                                    onTouchMove={handleMouseMove}
                                    onTouchEnd={handleMouseUp}
                                    style={{ cursor: tool === 'eraser' ? 'crosshair' : 'crosshair' }}
                                >
                                    {/* Base image */}
                                    <Layer>
                                        <KonvaImage
                                            image={uploadedImage}
                                            x={imgDims.x}
                                            y={imgDims.y}
                                            width={imgDims.width}
                                            height={imgDims.height}
                                        />
                                    </Layer>

                                    {/* Paint overlay */}
                                    {showOverlay && (
                                        <Layer opacity={opacity}>
                                            {lines.map((line, i) => (
                                                <Line
                                                    key={i}
                                                    points={line.points}
                                                    stroke={line.color}
                                                    strokeWidth={line.strokeWidth}
                                                    tension={0.5}
                                                    lineCap="round"
                                                    lineJoin="round"
                                                    globalCompositeOperation={line.globalCompositeOperation}
                                                    fillPatternImage={
                                                        selectedTexture !== null &&
                                                            line.globalCompositeOperation !== 'destination-out' &&
                                                            textureImage
                                                            ? textureImage
                                                            : undefined
                                                    }
                                                />
                                            ))}
                                        </Layer>
                                    )}
                                </Stage>
                            )}
                        </div>

                        {/* Toolbar */}
                        {uploadedImage && (
                            <div className="simulator-canvas-toolbar">
                                <div className="toolbar-group">
                                    <button
                                        className={`toolbar-btn ${tool === 'brush' ? 'active' : ''}`}
                                        onClick={() => setTool('brush')}
                                        title="Fırça"
                                    >
                                        <FiEdit3 size={16} />
                                        <span>Fırça</span>
                                    </button>
                                    <button
                                        className={`toolbar-btn ${tool === 'eraser' ? 'active' : ''}`}
                                        onClick={() => setTool('eraser')}
                                        title="Silgi"
                                    >
                                        <BsEraserFill size={16} />
                                        <span>Silgi</span>
                                    </button>
                                </div>

                                <div className="toolbar-separator" />

                                <div className="brush-size-control">
                                    <label>Boyut</label>
                                    <input
                                        type="range"
                                        min="5"
                                        max="100"
                                        value={brushSize}
                                        onChange={(e) => setBrushSize(Number(e.target.value))}
                                    />
                                    <span className="brush-size-value">{brushSize}px</span>
                                </div>

                                <div className="toolbar-separator" />

                                <div className="opacity-control">
                                    <label>Opaklık</label>
                                    <input
                                        type="range"
                                        min="10"
                                        max="100"
                                        value={Math.round(opacity * 100)}
                                        onChange={(e) => setOpacity(Number(e.target.value) / 100)}
                                    />
                                    <span className="opacity-value">{Math.round(opacity * 100)}%</span>
                                </div>

                                <div className="toolbar-separator" />

                                <div className="toolbar-group">
                                    <button
                                        className="toolbar-btn"
                                        onClick={handleUndo}
                                        disabled={lines.length === 0}
                                        title="Geri Al"
                                    >
                                        <FiRotateCcw size={16} />
                                        <span>Geri</span>
                                    </button>
                                    <button
                                        className="toolbar-btn"
                                        onClick={() => setShowOverlay(!showOverlay)}
                                        title={showOverlay ? 'Önceki Hali' : 'Sonraki Hali'}
                                    >
                                        {showOverlay ? <FiEyeOff size={16} /> : <FiEye size={16} />}
                                        <span>{showOverlay ? 'Önce' : 'Sonra'}</span>
                                    </button>
                                </div>

                                <div className="toolbar-separator" />

                                <div className="toolbar-group" style={{ marginLeft: 'auto' }}>
                                    <button className="toolbar-btn danger" onClick={handleClear} title="Temizle">
                                        <FiTrash2 size={16} />
                                        <span>Temizle</span>
                                    </button>
                                    <button className="toolbar-btn success" onClick={handleDownload} title="İndir">
                                        <FiDownload size={16} />
                                        <span>İndir</span>
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Sidebar */}
                    <div className="simulator-sidebar">
                        {/* Colors */}
                        <div className="sidebar-panel">
                            <h4>Renkler</h4>
                            <div className="color-grid">
                                {COLORS.map((c) => (
                                    <div
                                        key={c.value}
                                        className={`color-swatch ${selectedTexture === null && selectedColor === c.value
                                                ? 'active'
                                                : ''
                                            }`}
                                        style={{ background: c.value }}
                                        onClick={() => {
                                            setSelectedColor(c.value);
                                            setSelectedTexture(null);
                                        }}
                                        title={c.name}
                                    >
                                        <span className="swatch-label">{c.name}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Textures */}
                        <div className="sidebar-panel">
                            <h4>Dokular</h4>
                            <div className="texture-grid">
                                {TEXTURES.map((tex, i) => (
                                    <div
                                        key={tex.name}
                                        className={`texture-swatch ${selectedTexture === i ? 'active' : ''}`}
                                        style={{ background: tex.css, backgroundSize: '20px 20px' }}
                                        onClick={() => setSelectedTexture(i)}
                                        title={tex.name}
                                    >
                                        <span className="texture-label">{tex.name}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Before/After */}
                        {uploadedImage && (
                            <div className="sidebar-panel">
                                <h4>Görünüm</h4>
                                <div className="before-after-toggle">
                                    <button
                                        className={!showOverlay ? 'active' : ''}
                                        onClick={() => setShowOverlay(false)}
                                    >
                                        Önce
                                    </button>
                                    <button
                                        className={showOverlay ? 'active' : ''}
                                        onClick={() => setShowOverlay(true)}
                                    >
                                        Sonra
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* Actions */}
                        {uploadedImage && (
                            <div className="sidebar-panel">
                                <h4>İşlemler</h4>
                                <button
                                    className="btn btn-outline"
                                    onClick={handleReset}
                                    style={{ width: '100%', marginBottom: '0.5rem', fontSize: '0.85rem' }}
                                >
                                    Yeni Fotoğraf Yükle
                                </button>
                                <button
                                    className="btn btn-primary"
                                    onClick={handleDownload}
                                    style={{ width: '100%', fontSize: '0.85rem' }}
                                >
                                    <FiDownload />
                                    Sonucu İndir
                                </button>
                            </div>
                        )}
                    </div>
                </motion.div>
            </div>
        </section>
    );
}

export default BuildingSimulator;

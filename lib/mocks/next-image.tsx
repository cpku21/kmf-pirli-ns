import React from 'react';

interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  priority?: boolean;
  className?: string;
  fill?: boolean;
}

export default function Image({ src, alt, width, height, className, fill, ...props }: ImageProps) {
  const style = fill
    ? { position: 'absolute' as const, height: '100%', width: '100%', left: 0, top: 0, right: 0, bottom: 0, objectFit: 'cover' as const }
    : {};
  return (
    <img
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={className}
      style={style}
      loading="lazy"
      {...props}
    />
  );
}

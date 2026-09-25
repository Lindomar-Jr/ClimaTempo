import Image, { type ImageProps } from 'next/image';

interface WeatherIconProps {
  animatedSrc: ImageProps['src'];
  staticSrc: ImageProps['src'];
  className: string;
  size: number;
}

function getImageSource(source: ImageProps['src']) {
  if (typeof source === 'string') {
    return source;
  }

  return 'src' in source ? source.src : source.default.src;
}

export default function WeatherIcon({
  animatedSrc,
  staticSrc,
  className,
  size,
}: WeatherIconProps) {
  return (
    <picture className="weather-icon-picture">
      <source
        media="(prefers-reduced-motion: reduce)"
        srcSet={getImageSource(staticSrc)}
      />
      <Image
        src={animatedSrc}
        alt=""
        aria-hidden="true"
        width={size}
        height={size}
        className={className}
        unoptimized
      />
    </picture>
  );
}
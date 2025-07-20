import Image from 'next/image';

interface ImageProps {
  images: {
    src: string;
    alt: string;
    width: number;
    height: number;
  }[];
  caption?: string;
};

export function ImageGroup({ images, caption }: ImageProps) {
  return (
    <figure>
      <div className="-mx-4 px-4 flex items-center gap-4 overflow-x-auto">
        {images.map((image, i) => (
          <Image
            key={i}
            src={image.src}
            alt={image.alt}
            width={image.width}
            height={image.height}
            className="m-0 rounded-lg"
          />
        ))}
      </div>
      
      {caption &&
        <figcaption className="text-center text-dark/25">{caption}</figcaption>
      }
    </figure>
  );
}
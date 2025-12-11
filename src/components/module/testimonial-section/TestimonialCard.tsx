import React from "react";
import Image, { StaticImageData } from "next/image";

type TestimonialCardProps = {
  name?: string;
  role?: string;
  company?: string;
  quote?: string;
  rating?: number; // 0-5
  imageSrc?: StaticImageData | string;
  imageAlt?: string;
  className?: string;
};

const Star: React.FC<{ filled?: boolean }> = ({ filled = true }) => (
  <svg
    aria-hidden="true"
    className={`w-5 h-5 ${filled ? "text-yellow-400" : "text-gray-300"}`}
    viewBox="0 0 20 20"
    fill={filled ? "currentColor" : "none"}
    stroke={filled ? "none" : "currentColor"}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.95a1 1 0 00.95.69h4.158c.969 0 1.371 1.24.588 1.81l-3.37 2.45a1 1 0 00-.364 1.118l1.287 3.95c.3.921-.755 1.688-1.54 1.118L10 15.347l-3.464 2.714c-.785.57-1.84-.197-1.54-1.118l1.287-3.95a1 1 0 00-.364-1.118L2.545 9.377c-.783-.57-.38-1.81.588-1.81h4.158a1 1 0 00.95-.69l1.286-3.95z" />
  </svg>
);

export default function TestimonialCard({
  name = "Johne Doe",
  role = "Product Manager",
  company = "Acme Corp",
  quote = "This is the best service I have ever used. Highly recommended!",
  rating = 5,
  imageSrc,
  imageAlt = "Customer photo",
  className = "",
}: TestimonialCardProps) {
  const stars = Array.from({ length: 5 }).map((_, i) => i < Math.round(rating));

  return (
    <figure
      className={`relative max-w-md mx-auto mt-6 ${className}`}
      aria-label={`Testimonial from ${name}`}
    >
      {/* Card */}
      <div className="bg-linear-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl shadow-lg p-8 pt-20 overflow-hidden border border-gray-100 dark:border-gray-800">
        {/* Avatar (overlapping) */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <div className="w-24 h-24 rounded-full ring-4 ring-white dark:ring-gray-900 overflow-hidden shadow-md">
            {imageSrc ? (
              <Image
                src={imageSrc}
                alt={imageAlt}
                width={96}
                height={96}
                className="img-contain w-full h-full object-cover"
              />
            ) : (
              // fallback avatar: colored circle with initials
              <div className="w-full h-full bg-linear-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white font-semibold text-lg">
                {name
                  .split(" ")
                  .map((n) => n[0])
                  .slice(0, 2)
                  .join("")}
              </div>
            )}
          </div>
        </div>

        <figcaption className="text-center mt-2">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
            {name}
          </h3>
          <div className="text-sm text-gray-500 dark:text-gray-400">
            {role}
            {company ? <span className="mx-1">·</span> : null}
            {company}
          </div>
        </figcaption>

        {/* Rating */}
        <div className="mt-4 flex justify-center items-center">
          <div
            className="inline-flex items-center gap-1 bg-white/80 dark:bg-black/40 px-3 py-1 rounded-full shadow-sm"
            aria-hidden="true"
          >
            {stars.map((filled, i) => (
              <Star key={i} filled={filled} />
            ))}
          </div>
          {/* Accessible rating text for screen readers */}
          <span className="sr-only">{`${rating} out of 5 stars`}</span>
        </div>

        {/* Quote */}
        <blockquote className="mt-4">
          <p className="text-center text-sm text-gray-700 dark:text-gray-300 italic">
            “{quote}”
          </p>
        </blockquote>

        {/* Decorative bottom bar */}
        <div className="mt-6 h-0.5 bg-gradient-to-r from-indigo-300 via-purple-300 to-pink-300 rounded-full opacity-60" />
      </div>
    </figure>
  );
}
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const convertFileToBase64 = (file: File): Promise<string> => {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();

    reader.onloadend = () => {
      if (reader.result && typeof reader.result === "string") {
        resolve(reader.result); // This is the Base64 encoded string
      } else {
        reject(new Error("Failed to read file"));
      }
    };

    reader.onerror = () => {
      reject(
        reader.error ??
          new Error("An unknown error occurred while reading the file"),
      );
    };

    reader.readAsDataURL(file); // Read the file as a Data URL to get Base64 encoding
  });
};

export function formatCurrency(amount: string): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(parseInt(amount));
}

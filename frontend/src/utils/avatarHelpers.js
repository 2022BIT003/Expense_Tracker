export const MAX_AVATAR_SIZE_BYTES = 1.5 * 1024 * 1024;

export const readImageAsDataUrl = (file) =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(file);
    });

const slides = import.meta.glob<{ default: string }>(
  "../safe-assets/slides/*.html",
  { as: "string" },
);

export const loadSlide = async (slideName: string): Promise<string> => {
  const key = `../safe-assets/slides/${slideName}.html`;
  const loadModule = slides[key];
  if (loadModule) {
    const module = await loadModule();
    return module.default;
  }
  throw new Error(`Slide ${slideName} not found`);
};

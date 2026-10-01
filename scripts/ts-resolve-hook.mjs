const needsTs = (specifier) =>
  (specifier.startsWith("./") || specifier.startsWith("../")) &&
  !/\.(tsx?|jsx?|mjs|cjs|json|css)$/.test(specifier)

export async function resolve(specifier, context, nextResolve) {
  if (needsTs(specifier)) return nextResolve(`${specifier}.ts`, context)
  return nextResolve(specifier, context)
}

export async function copy(payload: string) {
  if (!navigator?.clipboard) {
    alert("Clipboard not supported");

    return false;
  }

  try {
    await navigator.clipboard.writeText(payload);

    return true;
  } catch (error) {
    console.error("Copy failed", error);

    return false;
  }
}

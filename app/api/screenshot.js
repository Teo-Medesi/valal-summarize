const screenshot = async (URL) => {
  const image = await fetch(`https://image.thum.io/get/${URL}`);

  return image;
};

export default screenshot;

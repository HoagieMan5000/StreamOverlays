export const setCanvasFullScreen = (canvas: HTMLCanvasElement) => {
  const parent = canvas.parentElement;

  if (parent) {
    // Get the parent element's dimensions
    const parentWidth = parent.offsetWidth;
    const parentHeight = parent.offsetHeight;

    // Calculate the smaller of the two dimensions to maintain a 1:1 aspect ratio
    //const size = Math.min(parentWidth, parentHeight);

    // Set the canvas's internal drawing resolution to match the 1:1 aspect ratio
    const devicePixelRatio = window.devicePixelRatio || 1;
    console.log({ parentWidth, devicePixelRatio })
    // Set the canvas width and height
    canvas.width = parentWidth * devicePixelRatio;
    canvas.height = parentHeight * devicePixelRatio;
  }
};

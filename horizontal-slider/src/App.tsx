import { useEffect, useState } from "react";
import styles from "./App.module.scss";

const App = () => {
  const allImages = [
    "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_1280.jpg",
    "https://media.istockphoto.com/id/517188688/photo/mountain-landscape.jpg?s=612x612&w=0&k=20&c=A63koPKaCyIwQWOTFBRWXj_PwCrR4cEoOw2S9Q7yVl8=",
    "https://cdn.pixabay.com/photo/2014/02/27/16/10/flowers-276014_640.jpg",
    "https://www.nasa.gov/sites/default/files/styles/full_width/public/thumbnails/image/main_image_star-forming_region_carina_nircam_final-1280.jpg",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQdMVOn6r9KP1GvNgv1kKb6fP49Tfl0msCD6w&usqp=CAU",
  ];

  const [carousel, setCarousel] = useState<Element | null>();
  const [imageTag, setImageTag] = useState<NodeListOf<Element>>();
  const [dragging, setDragging] = useState(false);
  const [prevPageX, setprevPageX] = useState(0);
  const [prevScroll, setprevScroll] = useState(0);
  const [imgActive, setimgActive] = useState(0);

  useEffect(() => {
    setCarousel(document.querySelector("#carousel"));
    setImageTag(document.querySelectorAll(".image"));
  }, []);

  const handleDragging = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!carousel || !dragging || !imageTag) return;
    const pageWidth = e.pageX;
    carousel.scrollLeft = (pageWidth - prevPageX - prevScroll) * -1;
  };

  const dragStart = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!carousel || !imageTag) return;
    setDragging(true);
    setprevPageX(e.pageX);
  };

  const dragStop = () => {
    if (!carousel || !imageTag) return;

    setDragging(false);

    const imageToShow = Math.round(
      (carousel.scrollLeft + imageTag[0]?.clientWidth) /
        imageTag[0]?.clientWidth
    );

    const finalScrollLeft =
      imageToShow * imageTag[0]?.clientWidth - imageTag[0]?.clientWidth;

    setTimeout(() => {
      setprevScroll(finalScrollLeft);
      setimgActive(imageToShow - 1);
      carousel.scrollLeft = finalScrollLeft;
    }, 200);
  };

  const clickDrag = (e: any) => {
    if (!carousel || !imageTag) return;

    if (e.target.id === "right") {
      carousel.scrollLeft += imageTag[0]?.clientWidth;
      setprevScroll((prev) => (prev += imageTag[0]?.clientWidth));
    }
    if (e.target.id === "left") {
      carousel.scrollLeft -= imageTag[0]?.clientWidth;
      setprevScroll((prev) => (prev -= imageTag[0]?.clientWidth));
    }
    const imageToShow =
      (carousel.scrollLeft + imageTag[0]?.clientWidth) /
      imageTag[0]?.clientWidth;
    setimgActive(imageToShow - 1);
  };

  const handleDotClick = (num: number) => {
    if (!imageTag || !carousel) return;
    carousel.scrollLeft = imageTag[0].clientWidth * num;
    setimgActive(num);

    const imageToShow = Math.round(
      (carousel.scrollLeft + imageTag[0]?.clientWidth) /
        imageTag[0]?.clientWidth
    );

    const finalScrollLeft =
      imageToShow * imageTag[0]?.clientWidth - imageTag[0]?.clientWidth;
    setprevScroll(finalScrollLeft);
  };

  return (
    <div className={styles.container}>
      <div className={styles.carouselWrapper}>
        <div
          className={styles.btns}
          id="left"
          onClick={clickDrag}
          style={{
            opacity: imgActive === 0 ? 0 : 1,
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="48"
            viewBox="0 -960 960 960"
            width="48"
          >
            <path d="M561-240 320-481l241-241 43 43-198 198 198 198-43 43Z" />
          </svg>
        </div>

        <div
          className={styles.carousel}
          id="carousel"
          onMouseMove={handleDragging}
          onMouseDown={dragStart}
          onMouseLeave={dragStop}
          onMouseUp={dragStop}
        >
          <div className={styles.imgWrapper}>
            {allImages.map((e) => (
              <img
                className={`${styles.img} image`}
                key={e}
                draggable={false}
                src={e}
              />
            ))}
          </div>
        </div>

        <div
          className={styles.btns}
          id="right"
          onClick={clickDrag}
          style={{
            opacity: imgActive === allImages.length - 1 ? 0 : 1,
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="48"
            viewBox="0 -960 960 960"
            width="48"
          >
            <path d="M530-481 332-679l43-43 241 241-241 241-43-43 198-198Z" />
          </svg>
        </div>
      </div>
      <div className={styles.footerBtnsWrapper}>
        {allImages.map((dot, i) => (
          <button
            className={
              imgActive === i
                ? `${styles.footerBtns} ${styles.footerBtnsActive}`
                : styles.footerBtns
            }
            key={dot + i}
            onClick={() => handleDotClick(i)}
          />
        ))}
      </div>
    </div>
  );
};

export default App;

import React, { useRef, useEffect } from 'react';
import styled from '@emotion/styled';

function Pointer() {
   const ref = useRef<HTMLCanvasElement>(null);

   useEffect(() => {
      if (ref.current) {
         funMouse(ref.current);
      }
   }, []);
   function funMouse(canvas: HTMLCanvasElement) {
      const canvasContext = canvas.getContext('2d');

      if (canvasContext) {
         // set canvas size
         let canvasWidth = (canvas.width = window.innerWidth);
         let canvasHeight = (canvas.height = window.innerHeight);

         // get mouse position
         let mouseX = canvasWidth / 2;
         let mouseY = canvasHeight / 2;

         // create circles
         let circle = {
            radius: 12,
            lastX: mouseX,
            lastY: mouseY,
         };

         let miniCircle = {
            radius: 3,
            lastX: mouseX,
            lastY: mouseY,
         };

         // resize canvas function
         let resizeCanvas = function resizeCanvas() {
            canvasWidth = canvas.width = window.innerWidth;
            canvasHeight = canvas.height = window.innerHeight;
         };

         // create var holding mouseRender function
         let mouseRender = function mouseRender() {
            // clear canvas so no colours or styles overlap
            canvasContext.clearRect(0, 0, canvasWidth, canvasHeight);

            // get circles x-coordinate and y-coordinate based on mouse coordinates
            // the small circle has a slight delay due to the last parms passed
            circle.lastX = lerp(circle.lastX, mouseX, 0.5);
            circle.lastY = lerp(circle.lastY, mouseY, 0.5);

            miniCircle.lastX = lerp(miniCircle.lastX, mouseX, 0.1);
            miniCircle.lastY = lerp(miniCircle.lastY, mouseY, 0.1);

            // create first circle
            canvasContext.beginPath();
            canvasContext.arc(
               circle.lastX,
               circle.lastY,
               circle.radius,
               0,
               Math.PI * 2,
               false,
            );
            canvasContext.lineWidth = 2;
            canvasContext.strokeStyle = 'white';
            canvasContext.stroke();
            canvasContext.closePath();

            // create small/second circle
            canvasContext.lineCap = 'round';
            canvasContext.beginPath();
            canvasContext.arc(
               miniCircle.lastX,
               miniCircle.lastY,
               miniCircle.radius,
               0,
               Math.PI * 2,
               false,
            );
            canvasContext.fillStyle = 'white';
            canvasContext.fill();
            canvasContext.closePath();

            // render/draw mouse by calling requestAnimationFrame() and passing itself through
            requestAnimationFrame(mouseRender);
         };

         // mouseInit function
         function mouseInit() {
            // render/draw mouse by calling requestAnimationFrame() and passing mouseRender
            requestAnimationFrame(mouseRender);

            // on mouse move update coordinates
            window.addEventListener('mousemove', function (e) {
               mouseX = e.clientX;
               mouseY = e.clientY;
            });

            // update canvas size on window resize
            window.addEventListener('resize', resizeCanvas, false);
         }

         function lerp(a: number, b: number, n: number) {
            return (1 - n) * a + n * b;
         }

         mouseInit();
      }
   }

   return <Canvas ref={ref}></Canvas>;
}

const Canvas = styled.canvas`
   position: fixed;
   top: 0;
   left: 0;
   padding: 0;
   margin: 0;
   z-index: 9999;
   pointer-events: none;
`;

export default Pointer;

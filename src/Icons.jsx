import React from 'react';

export const RDFIcon = props => {

   // https://commons.wikimedia.org/wiki/File:Rdf_logo.svg
   return (
      <svg 
         xmlns="http://www.w3.org/2000/svg"
         version="1.1"
         viewBox="0 0 484 460"
         width={props.width}>
        <path
         fill="currentColor"
         d="m 372.34602,311.86292 c -2.544,-1.346 -5.14,-2.493 -7.743,-3.516 l 1.863,-0.15 c 0,0 -16.608,-7.354 -18.057,-60.722 -1.438,-53.372 15.828,-62.478 15.828,-62.478 l -2.48,0.109 c 13.045,-6.69 24.265,-17.267 31.669,-31.216 19.295,-36.291 5.488,-81.362003 -30.81,-100.657003 -36.31,-19.276 -81.372,-5.506 -100.656,30.817 -7.927,14.899 -10.178,31.273003 -7.677,46.733003 l -0.851,-1.306 c 0,0 4.373,19.365 -41.032,47.55 -45.397,28.2 -65.877,14.159 -65.877,14.159 l 1.302,1.925 c -1.298,-0.803 -2.544,-1.624 -3.901,-2.333 -36.306,-19.294 -81.379999,-5.509 -100.666999,30.804 -19.281,36.309 -5.489,81.365 30.813,100.668 27.063999,14.364 58.973999,10.36 81.460999,-7.655 l -0.487,0.946 c 0,0 16.531,-13.599 64.16,11.973 37.601,20.178 43.184,39.956 43.899,47.383 -0.983,27.57 13.388,54.618 39.389,68.433 36.301,19.299 81.374,5.498 100.657,-30.804 19.292,-36.302 5.507,-81.382 -30.803,-100.663 z m -83.934,9.785 c -6.018,2.129 -23.203,4.487 -59.389,-14.921 -39.187,-21.04 -45.005,-38.615 -45.855,-43.891 0.557,-6.401 0.202,-12.791 -0.891,-19.02 l 0.239,0.359 c 0,0 -3.189,-17.096 41.65,-44.943 40.133,-24.908 58.376,-19.955 61.771,-18.653 2.185,1.485 4.45,2.867 6.825,4.131 4.518,2.398 9.174,4.283 13.888,5.672 5.52,5.257 15.678,20.178 16.733,59.413 1.078,39.535 -10.533,54.779 -16.865,60.168 -6.526,2.956 -12.626,6.897 -18.106,11.685 z" />
      </svg>      
   )

}

export const SearchIcon = props => {

   // https://commons.wikimedia.org/wiki/File:OOjs_UI_icon_search-ltr.svg
   return (
      <svg 
         xmlns="http://www.w3.org/2000/svg" 
         version="1.1"
         viewBox="0 0 12 12"
         width={props.width}>
         <g stroke-width="2" stroke="currentColor" fill="none">
            <path d="M11.29 11.71l-4-4"/>
            <circle cx="5" cy="5" r="4"/>
         </g>
      </svg>
   )

}

export const LoadSpinner = () => {

   // By Sam Herbert (@sherb), for everyone. More @ http://goo.gl/7AJzbL
   return (
     <svg width="28" height="28" viewBox="0 0 38 38" xmlns="http://www.w3.org/2000/svg" stroke="currentColor">
       <g fill="none" fill-rule="evenodd">
         <g transform="translate(1 1)" stroke-width="2">
           <circle stroke-opacity=".5" cx="18" cy="18" r="18"/>
             <path d="M36 18c0-9.94-8.06-18-18-18">
               <animateTransform
                 attributeName="transform"
                  type="rotate"
                  from="0 18 18"
                  to="360 18 18"
                  dur="1s"
                  repeatCount="indefinite"/>
            </path>
         </g>
       </g>
     </svg>
   )
}

export const Error = () => {

   // https://commons.wikimedia.org/wiki/File:Ic_error_36px.svg
   return (
      <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 36 36">
         <path d="M0 0h36v36h-36z" fill="none"/>
         <path fill="currentColor" d="M18 3c-8.28 0-15 6.72-15 15s6.72 15 15 15c8.28 0 15-6.72 15-15s-6.72-15-15-15zm1 22h-2v-2h2v2zm0-5h-2v-9h2v9z"/>
      </svg>
   )

}

import React from 'react'

function Rating({ value, size, color, isComment=false }) {
  return (
    isComment? <div className='rating flex items-center justify-end'>
       
    
    <span className="mr-1">
      <i style={{ color }} className={
        value >= 1
          ? 'fas fa-star'
          : value >= 0.5
            ? 'fas fa-star-half-alt'
            : 'far fa-star'
      }>
      </i>
    </span>
    <span className="mr-1">
      <i style={{ color }} className={
        value >= 2
          ? 'fas fa-star'
          : value >= 1.5
            ? 'fas fa-star-half-alt'
            : 'far fa-star'
      }>
      </i>
    </span>
    <span className="mr-1">
      <i style={{ color }} className={
        value >= 3
          ? 'fas fa-star'
          : value >= 2.5
            ? 'fas fa-star-half-alt'
            : 'far fa-star'
      }>
      </i>
    </span>
    <span className="mr-1">
      <i style={{ color }} className={
        value >= 4
          ? 'fas fa-star'
          : value >= 3.5
            ? 'fas fa-star-half-alt'
            : 'far fa-star'
      }>
      </i>
    </span>
    <span className="mr-1">
      <i style={{ color }} className={
        value >= 5
          ? 'fas fa-star'
          : value >= 4.5
            ? 'fas fa-star-half-alt'
            : 'far fa-star'
      }>
      </i>
    </span>
  </div>:<div className='rating flex items-center justify-end'>
       
       <span className="mr-2 text-gray-500 ">تقييم</span>
       <span className="mr-2 text-gray-500 ">
 {size && size}
         </span>
       <span className="mr-1">
         <i style={{ color }} className={
           value >= 1
             ? 'fas fa-star'
             : value >= 0.5
               ? 'fas fa-star-half-alt'
               : 'far fa-star'
         }>
         </i>
       </span>
       <span className="mr-1">
         <i style={{ color }} className={
           value >= 2
             ? 'fas fa-star'
             : value >= 1.5
               ? 'fas fa-star-half-alt'
               : 'far fa-star'
         }>
         </i>
       </span>
       <span className="mr-1">
         <i style={{ color }} className={
           value >= 3
             ? 'fas fa-star'
             : value >= 2.5
               ? 'fas fa-star-half-alt'
               : 'far fa-star'
         }>
         </i>
       </span>
       <span className="mr-1">
         <i style={{ color }} className={
           value >= 4
             ? 'fas fa-star'
             : value >= 3.5
               ? 'fas fa-star-half-alt'
               : 'far fa-star'
         }>
         </i>
       </span>
       <span className="mr-1">
         <i style={{ color }} className={
           value >= 5
             ? 'fas fa-star'
             : value >= 4.5
               ? 'fas fa-star-half-alt'
               : 'far fa-star'
         }>
         </i>
       </span>
     </div>
    
  )
}

export default Rating

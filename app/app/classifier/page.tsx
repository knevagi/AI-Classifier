// 'use client'
// import React,{useState,Suspense} from 'react'
// import { useRouter,useSearchParams } from 'next/navigation'
// import ClassTable from '../components/ClassTable'
// import FileUpload from '../components/FileUpload'

// const ClassifierDetails = () => {
//   const router = useSearchParams();
//   const type=router.get("name")|| "Default";;
//   const imgurl=type=="Flower"?"\\assets\\img\\flower.jpg":"\\assets\\img\\burger.jpg";
//   const heading=type=="Flower"?"Flower Classifier!":"Food Classifier!";
//   const subheading=type=="Flower"?"Discover Nature's Beauty: Effortlessly Identify and Appreciate Flowers with AI's Help.":"Embark on Culinary Journeys: Instantly Recognize Your Favorite Foods with AI Precision.";
//   return (
//     <Suspense fallback={<div>Loading...</div>}>
//     <div>
//     <div className="hero min-h-56 bg-base-200">
//       <div className="hero-content flex-col lg:flex-row-reverse">
//         <img src={imgurl} className="max-w-sm rounded-lg shadow-2xl" />
//         <div>
//           <h1 className="text-5xl font-bold">{heading}</h1>
//           <p className="py-6">{subheading}</p>
//         </div>
//       </div>
//     </div>
//     <FileUpload className={type} />
//     <ClassTable classifiertype={type} />
//   </div>
//   </Suspense>
    
//   )
// }

// export default ClassifierDetails
'use client'
import React, { Suspense } from 'react'
import ClassTable from '../components/ClassTable'
import { useRouter,useSearchParams } from 'next/navigation'
import FileUpload from '../components/FileUpload'

const ClassifierContent = () => {
  const router = useSearchParams();
  const type = router.get("name") || "Default";
  const imgurl = type === "Flower" ? "\\assets\\img\\flower.jpg" : "\\assets\\img\\burger.jpg";
  const heading = type === "Flower" ? "Flower Classifier!" : "Food Classifier!";
  const subheading = type === "Flower" 
    ? "Discover Nature's Beauty: Effortlessly Identify and Appreciate Flowers with AI's Help."
    : "Embark on Culinary Journeys: Instantly Recognize Your Favorite Foods with AI Precision.";

  return (
    <div>
      <div className="hero min-h-56 bg-base-200">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <img src={imgurl} className="max-w-sm rounded-lg shadow-2xl" alt={type + " image"} />
          <div>
            <h1 className="text-5xl font-bold">{heading}</h1>
            <p className="py-6">{subheading}</p>
          </div>
        </div>
      </div>
      <FileUpload className={type} />
      <ClassTable classifiertype={type} />
    </div>
  )
}

const ClassifierDetails = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ClassifierContent />
    </Suspense>
  )
}

export default ClassifierDetails

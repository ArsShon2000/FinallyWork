import React, { useEffect, useState } from "react";
import stylab from "./GenCarNumber.module.css"
import gosNum from "./gosnomer.png"
import axios from "axios";


const instance = axios.create({
    withCredentials: true,
    baseURL: 'http://127.0.0.1:5000',
})



const GenCarNumber = (props) => {
    let genNum = props.genNum

    let [changeSizeCarNumber, setChangeSizeCarNumber] = useState(1)
    let [changeSizeCarNumber2, setChangeSizeCarNumber2] = useState(1)
    let [changeSizeCarNumber3, setChangeSizeCarNumber3] = useState(1)
    let [changeSizeCarNumber4, setChangeSizeCarNumber4] = useState(1)

    //  ======================== 1 видео поток ======================== 

    const onSizeChange = () => {
        if (changeSizeCarNumber === 3) {
            changeSizeCarNumber = 1
            setChangeSizeCarNumber(changeSizeCarNumber)
        } else {
            changeSizeCarNumber++
            setChangeSizeCarNumber(changeSizeCarNumber)
        }
    }

    //  ======================== 2 видео поток ======================== 

    const onSizeChange2 = () => {
        if (changeSizeCarNumber2 === 3) {
            changeSizeCarNumber2 = 1
            setChangeSizeCarNumber2(changeSizeCarNumber2)
        } else {
            changeSizeCarNumber2++
            setChangeSizeCarNumber2(changeSizeCarNumber2)
        }
    }

    //  ======================== 3 видео поток ======================== 

    const onSizeChange3 = () => {
        if (changeSizeCarNumber3 === 3) {
            changeSizeCarNumber3 = 1
            setChangeSizeCarNumber3(changeSizeCarNumber3)
        } else {
            changeSizeCarNumber3++
            setChangeSizeCarNumber3(changeSizeCarNumber3)
        }
    }

    //  ======================== 4 видео поток ======================== 

    const onSizeChange4 = () => {
        if (changeSizeCarNumber4 === 3) {
            changeSizeCarNumber4 = 1
            setChangeSizeCarNumber4(changeSizeCarNumber4)
        } else {
            changeSizeCarNumber4++
            setChangeSizeCarNumber4(changeSizeCarNumber4)
        }
    }





    // genNum разбиваем на две переменные
    let defLong, defShort
    const longArray = [], shortArray = []
    if (genNum.length > 1 && genNum !== '') {
        let j = 0
        for (let i = 0; i < genNum.length; i++) {
            if (i < 6) { longArray[i] = genNum[i] }
            if (i > 5) {
                shortArray[j] = genNum[i]
                j++
            }
        }
        defLong = longArray.join('') // из массива в стринг
        defShort = shortArray.join('')
    }

    if(genNum){
        return (
            <div className={stylab.lab} >
                <div className={stylab.imgArea}>
                    {/*  ======================== 1 видео поток ========================  */}
                     <div className={stylab.img1}>
                            <div onClick={onSizeChange} className={stylab.image1}>
                                <img style={changeSizeCarNumber === 1 ? { "width": "200px" } :  // small picture
                                    changeSizeCarNumber === 3 ? { "width": "552px" } : {}} // big picture
                                    src={gosNum} alt="gosNum" />
                            </div>
                            <span style={changeSizeCarNumber === 1 ?
                                { "fontSize": "35px", "left": "15px", "width": "128px" } : // small long number
                                changeSizeCarNumber === 3 ?
                                    { "fontSize": "105px", "left": "35px", "width": "370px", "top": "6px" } : {}} // big long number
                                onClick={onSizeChange} className={stylab.longText1}>{defLong}</span>
                            <span style={changeSizeCarNumber === 1 ?
                                { "fontSize": "23px", "left": "154px", "top": "-11px", "width": "36px" } :  // small short number
                                changeSizeCarNumber === 3 ?
                                    { "fontSize": "70px", "left": "420px", "width": "111px", "top": "-28px" } : {}} // big short number
                                onClick={onSizeChange} className={stylab.shortText1}>{defShort}</span>
                        </div>
                        


                    {/*  ======================== 2 видео поток ========================  */}
                    {/* <div className={stylab.img2}>
                        <div onClick={onSizeChange2} className={stylab.image1}>
                            <img style={changeSizeCarNumber2 === 1 ? { "width": "200px" } :  // small picture
                                changeSizeCarNumber2 === 3 ? { "width": "552px" } : {}} // big picture
                                src={gosNum} alt="gosNum" />
                        </div>
                        <span style={changeSizeCarNumber2 === 1 ?
                            { "fontSize": "35px", "left": "15px", "width": "128px" } : // small long number
                            changeSizeCarNumber2 === 3 ?
                                { "fontSize": "105px", "left": "35px", "width": "370px", "top": "6px" } : {}} // big long number
                            onClick={onSizeChange2} className={stylab.longText1}>{defLong}</span>
                        <span style={changeSizeCarNumber2 === 1 ?
                            { "fontSize": "23px", "left": "154px", "top": "-11px", "width": "36px" } :  // small short number
                            changeSizeCarNumber2 === 3 ?
                                { "fontSize": "70px", "left": "420px", "width": "111px", "top": "-28px" } : {}} // big short number
                            onClick={onSizeChange2} className={stylab.shortText1}>{defShort}</span>
                    </div> */}
                    {/*  ======================== 3 видео поток ========================  */}
                    {/* <div className={stylab.img3}>

                        <div onClick={onSizeChange3} className={stylab.image1}>
                            <img style={changeSizeCarNumber3 === 1 ? { "width": "200px" } :  // small picture
                                changeSizeCarNumber3 === 3 ? { "width": "552px" } : {}} // big picture
                                src={gosNum} alt="gosNum" />
                        </div>
                        <span style={changeSizeCarNumber3 === 1 ?
                            { "fontSize": "35px", "left": "15px", "width": "128px" } : // small long number
                            changeSizeCarNumber3 === 3 ?
                                { "fontSize": "105px", "left": "35px", "width": "370px", "top": "6px" } : {}} // big long number
                            onClick={onSizeChange3} className={stylab.longText1}>{defLong}</span>
                        <span style={changeSizeCarNumber3 === 1 ?
                            { "fontSize": "23px", "left": "154px", "top": "-11px", "width": "36px" } :  // small short number
                            changeSizeCarNumber3 === 3 ?
                                { "fontSize": "70px", "left": "420px", "width": "111px", "top": "-28px" } : {}} // big short number
                            onClick={onSizeChange3} className={stylab.shortText1}>{defShort}</span>
                    </div> */}
                    {/*  ======================== 4 видео поток ========================  */}
                    {/* <div className={stylab.img4}>
                        <div onClick={onSizeChange4} className={stylab.image1}>
                            <img style={changeSizeCarNumber4 === 1 ? { "width": "200px" } :  // small picture
                                changeSizeCarNumber4 === 3 ? { "width": "552px" } : {}} // big picture
                                src={gosNum} alt="gosNum" />
                        </div>
                        <span style={changeSizeCarNumber4 === 1 ?
                            { "fontSize": "35px", "left": "15px", "width": "128px" } : // small long number
                            changeSizeCarNumber4 === 3 ?
                                { "fontSize": "105px", "left": "35px", "width": "370px", "top": "6px" } : {}} // big long number
                            onClick={onSizeChange4} className={stylab.longText1}>{defLong}</span>
                        <span style={changeSizeCarNumber4 === 1 ?
                            { "fontSize": "23px", "left": "154px", "top": "-11px", "width": "36px" } :  // small short number
                            changeSizeCarNumber4 === 3 ?
                                { "fontSize": "70px", "left": "420px", "width": "111px", "top": "-28px" } : {}} // big short number
                            onClick={onSizeChange4} className={stylab.shortText1}>{defShort}</span>
                    </div> */}
                </div>
            </div>
        )
    }
        
    
    
}

export default GenCarNumber
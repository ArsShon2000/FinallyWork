import React, { useEffect, useState } from "react";
import stylab from "./GenCarNumber.module.css"
import gosNum from "./gosnomer.png"
import axios from "axios";


const instance = axios.create({
    withCredentials: true,
    baseURL: 'http://127.0.0.1:5000',
})



const GenCarNumber = (props) => {
    let genNum = props.genNum;
    let singleCamera = props.singleCamera;

    //  ======================== change size gosNumber ======================== 
    let [changeSizeCarNumber, setChangeSizeCarNumber] = useState(1)

    //  ======================== 1 видео поток ======================== 

    const onSizeChange = () => {
        if (changeSizeCarNumber === 3) {
            changeSizeCarNumber = 1
            setChangeSizeCarNumber(changeSizeCarNumber)
        } else {
            ++changeSizeCarNumber
            setChangeSizeCarNumber(changeSizeCarNumber)
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

    if (genNum) {
        return (
            <div className={stylab.imgArea}>
                {singleCamera
                    ? <>
                        <div className={changeSizeCarNumber === 1 ? stylab.backgroundImgSmall :
                            changeSizeCarNumber === 3 ? stylab.backgroundImgBig
                                : stylab.backgroundImgNormal}>
                            <img onClick={onSizeChange} src={gosNum} alt="gosNum" />
                        </div>
                        
                            <div className={changeSizeCarNumber === 1 ? stylab.longTextSmall :
                                changeSizeCarNumber === 3 ? stylab.longTextBig
                                    : stylab.longTextNormal}>
                                <span onClick={onSizeChange}>{defLong}</span>
                            </div>
                            <div className={changeSizeCarNumber === 1 ? stylab.shortTextSmall :
                                changeSizeCarNumber === 3 ? stylab.shortTextBig
                                    : stylab.shortTextNormal}>
                                <span onClick={onSizeChange}>{defShort}</span>
                            </div>
                    </>
                    :<>
                        <div className={changeSizeCarNumber === 1 ? stylab.backgroundImgSmall :
                            changeSizeCarNumber === 3 ? stylab.backgroundImgBig
                                : stylab.backgroundImgNormal}>
                            <img onClick={onSizeChange} src={gosNum} alt="gosNum" />
                        </div>
                            <div className={changeSizeCarNumber === 1 ? stylab.longTextSmall :
                                changeSizeCarNumber === 3 ? stylab.longTextBig
                                    : stylab.longTextNormal}>
                                <span onClick={onSizeChange}>{defLong}</span>
                            </div>
                            <div className={changeSizeCarNumber === 1 ? stylab.shortTextSmall :
                                changeSizeCarNumber === 3 ? stylab.shortTextBig
                                    : stylab.shortTextNormal}>
                                <span onClick={onSizeChange}>{defShort}</span>
                            </div>
                    </>
                }

            </div>
        )
    }
}

{/*  ======================== 2 видео поток ========================  */ }
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
{/*  ======================== 3 видео поток ========================  */ }
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
{/*  ======================== 4 видео поток ========================  */ }
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



export default GenCarNumber
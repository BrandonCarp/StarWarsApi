import React from 'react'
import "./Loading.css";

export default function Loading() {
    return (
        <div className="SplashScreen">
            <div className="LoadingImgs">
                <img id="FirstOrder" key="FirstOrder" alt="" src="/SWIcons/FirstOrder.png"/>
                <img id="GalacticEmpire" key="GalacticEmpire" alt="" src="/SWIcons/GalacticEmpire.png"/>
                <img id="JediOrder" key="JediOrder" alt="" src="/SWIcons/JediOrder.png"/>
                <img id="RebelAlliance" key="RebelAlliance" alt="" src="/SWIcons/RebelAlliance.png"/>
                <img id="RebelsPhoenix" key="RebelsPhoenix" alt="" src="/SWIcons/RebelsPhoenix.png"/>
            </div>
            <p className="LoadingText">Loading...</p>
        </div>
    )
}
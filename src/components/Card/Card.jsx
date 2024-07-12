import getSiteLocations from "../../utils/getSiteInfo";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function Card(cardData) {
    {cardData.map((item) => {
       <article>
        <h3>{item.City}</h3>
       </article>
    })

    }
        
}

export default Card;

import React, { useState, useEffect } from "react"
import styles from './PreparationComponent.module.css'


export default function PreparationComponent() {

    const [data, setData] = useState([]);
    const [sortedData, setSortedData] = useState({ offen: [], beingPrepared: [], cooking: [], available: [] })

    const fetchData = async () => {
        try {
            const response = await fetch("http://localhost:3000/api/getPizza");
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            const jsonData = await response.json();
            setData(jsonData.message);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    const sortData = () => {
        const sorted = {
            offen: [],
            beingPrepared: [],
            cooking: [],
            available: [],
        };

        data.forEach((pizza) => {
            var object = { name: pizza.name, ing: pizza.ing };

            if (pizza.status === "offen") {
                sorted.offen.push(object);
            } else if (pizza.status === "being prepared") {
                sorted.beingPrepared.push(object);
            } else if (pizza.status === "cooking") {
                sorted.cooking.push(object);
            } else if (pizza.status === "available") {
                sorted.available.push(object);
            }
        });

        setSortedData(sorted);
    };

    useEffect(() => {
        const intervalId = setInterval(() => {
            fetchData();
        }, 1000); // Fetch data every 5 seconds

        return () => clearInterval(intervalId);
    }, []);

    useEffect(() => {
        sortData();
    }, [data]);


    const OffenComponent = ({ sortedData }) => {
        return (
            <div className={styles.offenComponent}>
                <h3>Order Placed</h3>
                {sortedData.offen.map((item, index) => (
                    <p>{`${item.name} --- ${item.ing.join(", ")}`}</p>
                ))}
            </div>
        );
    };

    const InPreparationComponent = ({ sortedData }) => {
        return (
            <>
                <h3>In Preparation</h3>
                {sortedData.beingPrepared.map((item, index) => (
                    <p>{`${item.name} --- ${item.ing.join(", ")}`}</p>
                ))}
            </>
        )
    }

    const CookingComponent = ({ sortedData }) => {
        return (
            <>
                <h3>In the Oven</h3>
                {sortedData.cooking.map((item, index) => (
                    <p>{`${item.name} --- ${item.ing.join(", ")}`}</p>
                ))}
            </>
        )
    }

    const AvailableComponent = ({ sortedData }) => {
        return (
            <>
                <h3>Ready for Pickup</h3>
                {sortedData.available.map((item, index) => (
                    <p>{`${item.name} --- ${item.ing.join(", ")}`}</p>
                ))}
            </>
        )
    }


    return (
        <div className={styles.PreparationComponent}>
            <div className={styles.Components}>
                <OffenComponent sortedData={sortedData} className={styles.Components} />
            </div>
            <div className={styles.Components}>
                <InPreparationComponent sortedData={sortedData} className={styles.Components} />
            </div>
            <div className={styles.Components}>
                <CookingComponent sortedData={sortedData} className={styles.Components} />
            </div>
            <div className={styles.Components}>
                <AvailableComponent sortedData={sortedData} className={styles.Components} />
            </div>
        </div>
    )
}
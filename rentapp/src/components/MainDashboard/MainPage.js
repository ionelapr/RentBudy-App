import React from 'react'
import './MainPage.css'

export default function MainPage() {
    return (
        <div className='home'>
            <div className='featuredItem'>
                <span className='featuredTitle'>
                    Revenue
                    <div className='featuredMoneyContainer'>
                        <span className='featuredMoney'>
                            2840 LEI
                        </span>
                        <span className='featuredMoneyRate'>

                        </span>
                    </div>
                    <span className='featuredSub'>

                    </span>
                </span>
            </div>

            <div className='featuredItem'>
                <span className='featuredTitle'>
                    Expenses
                    <div className='featuredMoneyContainer'>
                        <span className='featuredMoney'>
                            308 LEI
                        </span>
                        <span className='featuredMoneyRate'>
                            -11,4
                        </span>
                    </div>
                    <span className='featuredSub'>
                        Compared to last month
                    </span>
                </span>
            </div>
        </div>
    )
}

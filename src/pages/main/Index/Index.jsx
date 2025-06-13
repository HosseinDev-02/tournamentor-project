import React from "react";
import Container from "../../../components/main/Container/Container";
import Header from "../../../components/main/Header/Header";
import PrimaryBorder from "../../../components/main/PrimaryBorder/PrimaryBorder";
import Box from "../../../components/main/Box/Box";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCards, Pagination } from "swiper/modules";
const tournaments = [
    {
        id: 1,
        date: "3 اردیبهشت",
        time: "14:30",
        image: "/images/main/events/event-1.jpg",
    },
    {
        id: 2,
        date: "17 خرداد",
        time: "15:20",
        image: "/images/main/events/event-2.jpg",
    },
    {
        id: 3,
        date: "23 فروردین",
        time: "22:00",
        image: "/images/main/events/event-3.jpg",
    },
];

import "swiper/css";
import "swiper/css/effect-cards";
import "swiper/css/pagination";

function MainIndex() {
    return (
        <div id="main-index">
            <Container>
                <Header />
                {/* Tournaments Slider */}
                <Box className="mt-2.5 grid grid-cols-2 gap-20 py-8">
                    {/* Tournaments Slider */}
                    <Swiper
                    dir="ltr"
                        className="tournaments-banner-swiper"
                        effect={"cards"}
                        grabCursor={true}
                        pagination={{ clickable: true }}
                        modules={[EffectCards, Pagination]}
                    >
                        {tournaments.map((item) => (
                            <SwiperSlide key={item.id}>
                                <div className="relative rounded-xl overflow-hidden shadow-lg max-w-[467px] w-full max-h-[560px] h-full">
                                    <img
                                        src={item.image}
                                        alt="poster"
                                        className="w-full h-full object-cover"
                                    />
                                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 text-white flex justify-between text-sm">
                                        <span>{item.date}</span>
                                        <span>{item.time} ساعت</span>
                                    </div>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                    {/* Tournaments Content */}
                </Box>
            </Container>
        </div>
    );
}

export default MainIndex;

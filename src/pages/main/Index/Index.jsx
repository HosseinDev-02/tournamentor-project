import React from 'react'
import Container from '../../../components/main/Container/Container'

function MainIndex() {
  return (
    <Container>
      <h6 className='font-Montserrat-Black'>Hello World</h6>
      <h6 className='font-WalterTurncoat'>Hello World</h6>
      <h6 className='font-VazirMatn-Bold'>سلام خدمت همه بازیکن ها و عاشقان گیم</h6>
      <h6 className='font-VazirMatn-Medium'>سلام خدمت همه بازیکن ها و عاشقان گیم</h6>
      <h6 className='font-VazirMatn'>سلام خدمت همه بازیکن ها و عاشقان گیم</h6>
      <h6 className='font-VazirMatn-Light'>سلام خدمت همه بازیکن ها و عاشقان گیم</h6>
      <div className='grid grid-cols-12'>
        <div className='w-40 h-40 rounded-full bg-yellow-light'></div>
        <div className='w-40 h-40 rounded-full bg-purple-50'></div>
        <div className='w-40 h-40 rounded-full bg-purple-100'></div>
        <div className='w-40 h-40 rounded-full bg-purple-200'></div>
        <div className='w-40 h-40 rounded-full bg-purple-500'></div>
        <div className='w-40 h-40 rounded-full bg-cyan'></div>
        <div className='w-40 h-40 rounded-full bg-section'></div>
        <div className='w-40 h-40 rounded-full bg-background'></div>
        <div className='w-40 h-40 rounded-full bg-neutral-300'></div>
        <div className='w-40 h-40 rounded-full bg-gray-900'></div>
      </div>
    </Container>
  )
}

export default MainIndex
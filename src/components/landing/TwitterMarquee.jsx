import { useEffect, useRef, useState, useMemo } from 'react';
import { Box, Flex, Image, Text } from '@chakra-ui/react';
import { motion, useMotionValue, useAnimationFrame, useTransform } from 'framer-motion';

import p1 from '../../assets/photos/1.jpg';
import p2 from '../../assets/photos/2.jpg';
import p3 from '../../assets/photos/3.jpg';
import p4 from '../../assets/photos/4.jpg';
import p5 from '../../assets/photos/5.jpg';
import p6 from '../../assets/photos/6.jpg';
import p7 from '../../assets/photos/7.jpg';

function wrap(min, max, value) {
  const range = max - min;
  return ((value - min) % range + range) % range + min;
}

const MotionDiv = motion.div;

const defaultTweets = [
  {
    photo: p1,
    username: '@Fernando_Her85',
    name: 'Fernando',
    text: 'Para los que trabajan en React, tírenle un ojo a este recurso!',
    link: 'https://x.com/Fernando_Her85/status/1885371613513744474'
  },
  {
    photo: p2,
    username: '@Virag_Ky',
    name: 'Virag',
    text: 'This is so cool - animated components collection 😀🔥',
    link: 'https://x.com/Virag_Ky/status/1875627547603694049'
  },
  {
    photo: p3,
    username: '@Traccey001',
    name: 'Tracy💻',
    text: 'This React library is absolutely amazing!!!',
    link: 'https://x.com/Traccey001/status/1875450691805966422'
  },
  {
    photo: p4,
    username: '@0xVollhard',
    name: 'Vollhard',
    text: 'This website is reactbits.dev. Thank me later devs',
    link: 'https://x.com/0xVollhard/status/1878091999552983453'
  },
  {
    photo: p5,
    username: '@makwanadeepam',
    name: 'Deepam Makwana',
    text: 'Really impressed by reactbits.dev. Check it out.',
    link: 'https://x.com/makwanadeepam/status/1879416558461890864'
  },
  {
    photo: p6,
    username: '@yyyyyy4ever',
    name: 'CY',
    text: 'This UI components library is mind blowing!',
    link: 'https://x.com/yyyyyy4ever/status/1883947635192819763'
  },
  {
    photo: p7,
    username: '@pradella',
    name: 'Maurício Pradella ⚡️',
    text: 'Just fell in love with React Bits',
    link: 'https://x.com/pradella/status/1884584121340457163'
  }
];

const TwitterMarquee = ({ tweets = defaultTweets, speed = 50 }) => {
  const trackRef = useRef(null);
  const baseX = useMotionValue(0);
  const [fullWidth, setFullWidth] = useState(0);
  const [paused, setPaused] = useState(false);

  const repeatedTweets = useMemo(() => [...tweets, ...tweets], [tweets]);

  const tweetRotations = useMemo(
    () => tweets.map((_, i) => (i % 2 === 0 ? 5 : -5)),
    [tweets]
  );

  useEffect(() => {
    if (trackRef.current) {
      setFullWidth(trackRef.current.scrollWidth);
    }
  }, [repeatedTweets]);

  const halfWidth = fullWidth / 2;
  const x = useTransform(baseX, (v) => {
    return wrap(-halfWidth, 0, v);
  });

  useAnimationFrame((_, delta) => {
    if (!paused && halfWidth > 0) {
      const moveBy = (speed * delta) / 1000;
      baseX.set(baseX.get() - moveBy);
    }
  });

  return (
    <Box
      position="relative"
      w="100vw"
      overflow="hidden"
      className="marquee-container"
    >
      <MotionDiv
        ref={trackRef}
        className="marquee-track"
        style={{ x }}
      >
        {repeatedTweets.map((tweet, index) => {
          const rotation = tweetRotations[index % tweets.length];
          return (
            <Flex
              as="a"
              key={index}
              onMouseEnter={() => setPaused(true)}
              onMouseLeave={() => setPaused(false)}
              href={tweet.link}
              rel="noreferrer"
              target="_blank"
              direction="column"
              justifyContent="flex-start"
              className="tweet-card"
              px="6"
              py="6"
              bg="#060606"
              border="1px solid #333"
              borderRadius="25px"
              boxShadow="md"
              ml={index === 0 ? 0 : '20px'}
              transform={`rotate(${rotation}deg)`}
            >
              <Flex gap={6} alignItems="center" mb={6}>
                <Image
                  src={tweet.photo}
                  alt={tweet.username}
                  borderRadius="full"
                  boxSize="50px"
                />
                <Flex direction="column">
                  <Text fontWeight={900}>{tweet.name}</Text>
                  <Text fontSize=".7rem" color="#999">
                    {tweet.username}
                  </Text>
                </Flex>
              </Flex>
              <Text fontWeight={300} lineHeight={1.2} color="#fff" whiteSpace="wrap">
                {tweet.text}
              </Text>
            </Flex>
          );
        })}
      </MotionDiv>

      <Box
        className="gradient-overlay"
        position="absolute"
        pointerEvents="none"
      />
    </Box>
  );
};

export default TwitterMarquee;

import React, { useState, useCallback } from 'react';
import styled from 'styled-components';
import beach from '../../assets/beach.jpg';
import bottle from '../../assets/bottle.jpg';
import cat from '../../assets/cat.jpg';
import chair from '../../assets/chair.jpg';
import golden from '../../assets/golden.jpg';
import grammy from '../../assets/grammy.jpg';
import house from '../../assets/house.jpg';
import kitchen from '../../assets/kitchen.jpg';
import mountain from '../../assets/mountain.jpg';
import mtl_night from '../../assets/mtl_night.jpg';
import museum_dark from '../../assets/museum_dark.jpg';
import museum_light from '../../assets/museum_light.jpg';
import noah_stairs from '../../assets/noah_stairs.jpg';
import one_tree from '../../assets/one_tree.jpg';
import plants from '../../assets/plants.jpg';
import pond from '../../assets/pond.jpg';
import street from '../../assets/street.jpg';
import sunset from '../../assets/sunset.jpg';
import tea from '../../assets/tea.jpg';
import tree_water from '../../assets/tree_water.jpg';
import trees from '../../assets/trees.jpg';
import trinity from '../../assets/trinity.jpg';
import village from '../../assets/village.jpg';
import wedding from '../../assets/wedding.jpg';
import zoe from '../../assets/zoe.jpg';

const p = (src, title) => ({ src, title });

const rows = [
  [p(plants, 'Plants'), p(trinity, 'Trinity'), p(chair, 'Chair')],
  [p(grammy, 'Grammy')],
  [p(mtl_night, 'Montreal Night'), p(house, 'House')],
  [p(wedding, 'Wedding'),   p(noah_stairs, 'Noah Stairs')],
  [p(zoe, 'Zoe')],
  [p(museum_dark, 'Museum Dark'), p(museum_light, 'Museum Light')],
  [p(trees, 'Trees'), p(pond, 'Pond'), p(one_tree, 'One Tree')],
  [p(bottle, 'Bottle'), p(kitchen, 'Kitchen')],
  [p(tree_water, 'Tree Water')],
  [p(village, 'Village'), p(cat, 'Cat')],
  [p(beach, 'Beach'),         p(tea, 'Tea'),           p(sunset, 'Sunset')],
  [p(mountain, 'Mountain')],
  [p(golden, 'Golden'),       p(street, 'Street')],
];

const Intro = styled.p`
  text-align: center;
  margin-bottom: 2rem;
`;

const Gallery = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;
`;

const Row = styled.div`
  display: flex;
  gap: 16px;
  width: 100%;

  @media (max-width: 700px) {
    flex-direction: column;
  }
`;

const Cell = styled.div`
  flex: ${(props) => props.$ratio};

  @media (max-width: 700px) {
    flex: none;
    width: 100%;
  }
`;

const Img = styled.img`
  width: 100%;
  height: auto;
  display: block;
`;

const DEFAULT_RATIO = 1.5;

const PhotographyBlock = () => {
  const [ratios, setRatios] = useState(() => {
    const init = {};
    rows.flat().forEach((photo) => { init[photo.title] = DEFAULT_RATIO; });
    return init;
  });

  const handleLoad = useCallback((e, title) => {
    const { naturalWidth, naturalHeight } = e.target;
    if (naturalWidth && naturalHeight) {
      setRatios((prev) => ({ ...prev, [title]: naturalWidth / naturalHeight }));
    }
  }, []);

  return (
    <div>
      {/* <Intro>
        Sed ut perspiciatis unde omnis iste natus error sit voluptatem
        accusantium doloremque laudantium, totam rem aperiam eaque ipsa quae ab
        illo inventore veritatis et quasi architecto beatae vitae dicta sunt
        explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur.
      </Intro> */}
      <Gallery>
        {rows.map((row, rowIndex) => {
          const total = row.reduce((sum, p) => sum + ratios[p.title], 0);
          const scale = total < 1 ? 1 / total : 1;
          return (
            <Row key={rowIndex}>
              {row.map((photo) => (
                <Cell key={photo.title} $ratio={ratios[photo.title] * scale}>
                  <Img
                    src={photo.src}
                    alt={photo.title}
                    onLoad={(e) => handleLoad(e, photo.title)}
                  />
                </Cell>
              ))}
            </Row>
          );
        })}
      </Gallery>
    </div>
  );
};

export default PhotographyBlock;

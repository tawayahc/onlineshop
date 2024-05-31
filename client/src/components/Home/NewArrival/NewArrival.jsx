import React, { useState } from 'react';

const newArrivals = [
  {
    id: 1,
    title: 'PlayStation 5',
    description: 'Black and White version of the PS5 coming out on sale.',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT65BtFUyoNJHNU0fsDykvyhx27Th5ftbbTg52DC5PwWpnDpMBEslq2JGkbdXhrYCxTa-Y&usqp=CAU',
    link: '#',
  },
  {
    id: 2,
    title: 'Women’s Collections',
    description: 'Featured women collections that give you another vibe.',
    image: 'https://www.nylabone.com/-/media/project/oneweb/nylabone/images/dog101/10-intelligent-dog-breeds/golden-retriever-tongue-out.jpg',
    link: '#',
  },
  {
    id: 3,
    title: 'Speakers',
    description: 'Amazon wireless speakers.',
    image: 'https://mediaproxy.snopes.com/width/1200/height/1200/https://media.snopes.com/2014/11/GettyImages-114984716.jpg',
    link: '#',
  },
  {
    id: 4,
    title: 'Perfume',
    description: 'GUCCI INTENSE OUD EDP.',
    image: 'https://images.saymedia-content.com/.image/ar_4:3%2Cc_fill%2Ccs_srgb%2Cfl_progressive%2Cq_auto:eco%2Cw_1200/MTczODEwMjc3ODkwOTI2MjE5/the-suffering-pug.jpg',
    link: '#',
  },
];

const NewArrival = () => {
  const [hovered, setHovered] = useState(null);

  const handleMouseEnter = (id) => setHovered(id);
  const handleMouseLeave = () => setHovered(null);

  return (
    <div style={styles.container}>
      <div className="flex items-center mb-4">
        <div className="bg-blue-500 h-8 w-2 mr-2"></div>
        <h2 className="text-blue-500 text-xl font-bold">Featured</h2>
      </div>
      <h3 style={styles.sectionHeader} className="mb-4">New Arrival</h3>
      <div style={styles.grid}>
        <div
          style={{ ...styles.card, ...styles.largeCard }}
          onMouseEnter={() => handleMouseEnter(newArrivals[0].id)}
          onMouseLeave={handleMouseLeave}
        >
          <img src={newArrivals[0].image} alt={newArrivals[0].title} style={styles.image} />
          <div style={{ ...styles.overlay, opacity: hovered === newArrivals[0].id ? 1 : 0 }}>
            <h4 style={styles.title}>{newArrivals[0].title}</h4>
            <p style={styles.description}>{newArrivals[0].description}</p>
            <a href={newArrivals[0].link} style={styles.button}>
              Shop Now
            </a>
          </div>
        </div>
        <div style={styles.rightColumn}>
          <div
            style={{ ...styles.card, ...styles.mediumCard }}
            onMouseEnter={() => handleMouseEnter(newArrivals[1].id)}
            onMouseLeave={handleMouseLeave}
          >
            <img src={newArrivals[1].image} alt={newArrivals[1].title} style={styles.image} />
            <div style={{ ...styles.overlay, opacity: hovered === newArrivals[1].id ? 1 : 0 }}>
              <h4 style={styles.title}>{newArrivals[1].title}</h4>
              <p style={styles.description}>{newArrivals[1].description}</p>
              <a href={newArrivals[1].link} style={styles.button}>
                Shop Now
              </a>
            </div>
          </div>
          <div style={styles.bottomRow}>
            {newArrivals.slice(2).map((product) => (
              <div
                key={product.id}
                style={{ ...styles.card, ...styles.smallCard }}
                onMouseEnter={() => handleMouseEnter(product.id)}
                onMouseLeave={handleMouseLeave}
              >
                <img src={product.image} alt={product.title} style={styles.image} />
                <div style={{ ...styles.overlay, opacity: hovered === product.id ? 1 : 0 }}>
                  <h4 style={styles.title}>{product.title}</h4>
                  <p style={styles.description}>{product.description}</p>
                  <a href={product.link} style={styles.button}>
                    Shop Now
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: '20px',
  },
  sectionHeader: {
    fontSize: '24px',
    fontWeight: 'bold',
    textAlign: 'left',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: '3fr 2fr',
    gap: '20px',
    height: '500px', // Set a total height for the grid
  },
  largeCard: {
    gridRow: 'span 2',
    position: 'relative',
    overflow: 'hidden',
    borderRadius: '10px',
    height: '94.5%', // Ensure it takes full height of the two rows
  },
  rightColumn: {
    display: 'grid',
    gridTemplateRows: '1fr 1fr',
    gap: '20px',
  },
  bottomRow: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '20px',
  },
  card: {
    position: 'relative',
    overflow: 'hidden',
    borderRadius: '10px',
  },
  image: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  overlay: {
    position: 'absolute',
    top: '0',
    left: '0',
    right: '0',
    bottom: '0',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    color: 'white',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    opacity: '0',
    transition: 'opacity 0.3s ease',
  },
  title: {
    fontSize: '24px',
    fontWeight: 'bold',
  },
  description: {
    fontSize: '16px',
    margin: '10px 0',
  },
  button: {
    backgroundColor: 'black',
    color: 'white',
    padding: '10px 20px',
    borderRadius: '5px',
    textDecoration: 'none',
    fontWeight: 'bold',
  },
};

export default NewArrival;

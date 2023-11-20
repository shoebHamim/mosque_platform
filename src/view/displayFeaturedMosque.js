import displayFeaturedMosques from './displayFeaturedMosques';

const displayFeaturedMosque = (featuredMosques) => {
  return (
    <div className="app">
      {featuredMosques.map(item => (
        <div key={item._id}>
          {displayFeaturedMosques({ item })} {/* Use the function directly */}
        </div>
      ))}
    </div>
  );
};

export default displayFeaturedMosque;

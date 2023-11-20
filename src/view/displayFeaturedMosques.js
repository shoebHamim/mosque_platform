const displayFeaturedMosques = ({ item }) => {

    const handleClick = () => {
        //mosqueDetails(item.id)
    }

  return (
    <div className="card card-compact w-96 bg-base-100 shadow-xl">
        <figure><img src={item.photo[0]} alt={item.name} /></figure>
        <div className="card-body">
            <h2 className="card-title">{item.name}</h2>
            <p>{item.division}</p>
            <div className="card-actions justify-end">
                <button className="btn btn-primary" onClick={handleClick}>View Details</button>
            </div>
        </div>
    </div>
  )
}

export default displayFeaturedMosques

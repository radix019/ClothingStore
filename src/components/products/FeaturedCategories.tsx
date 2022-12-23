import { useNavigate } from "react-router-dom";
import "./FeaturedCategories.scss";

interface CategoryItemProps {
  id: number;
  name: string;
  imageUrl: string;
}

const FeaturedCategories = ({ id, name, imageUrl }: CategoryItemProps) => {
  const navigate = useNavigate();
  const navigateTo = () => {
    navigate(`/shop/${name}`);
  };
  return (
    <div key={id} className="category-container" onClick={navigateTo}>
      <div
        className="background-image"
        style={{ backgroundImage: `url(${imageUrl})` }}
      />
      <div className="category-body-container">
        <h2>{name}</h2>
        <p>Shop Now</p>
      </div>
    </div>
  );
};

export default FeaturedCategories;

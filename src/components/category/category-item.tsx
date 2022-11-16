import { Categories } from "../../interfaces/components";
import "./category-item.scss";

interface CategoryItemProps {
  id: number;
  name: string;
  imageUrl: string;
}

const CategoryItem = ({ id, name, imageUrl }: CategoryItemProps) => {
  return (
    <div key={id} className="category-container">
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

export default CategoryItem;

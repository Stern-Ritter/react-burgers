import React, { FunctionComponent } from "react";
import styles from "./ingredient-details.module.css";

interface IIngredientDetailsProps {
  ingredient: TIngredient;
}

const IngredientDetails: FunctionComponent<IIngredientDetailsProps> = ({
  ingredient,
}) => {
  return (
    <div className={styles.details + " pl-10 pr-10 pb-15"}>
      <img
        className={styles.image + " mb-4"}
        alt={ingredient.name}
        src={ingredient.image_large}
      />
      <p className="text text_type_main-medium mb-8">{ingredient.name}</p>
      <ul className={styles.nutrients}>
        <li className={styles.nutrient + " mr-5"}>
          <p className="text text_type_main-default text_color_inactive mb-2">
            Калории,ккал
          </p>
          <p className="text text_type_digits-default text_color_inactive">
            {ingredient.calories}
          </p>
        </li>
        <li className={styles.nutrient + " mr-5"}>
          <p className="text text_type_main-default text_color_inactive mb-2">
            Белки, г
          </p>
          <p className="text text_type_digits-default text_color_inactive">
            {ingredient.proteins}
          </p>
        </li>
        <li className={styles.nutrient + " mr-5"}>
          <p className="text text_type_main-default text_color_inactive mb-2">
            Жиры, г
          </p>
          <p className="text text_type_digits-default text_color_inactive">
            {ingredient.fat}
          </p>
        </li>
        <li className={styles.nutrient}>
          <p className="text text_type_main-default text_color_inactive mb-2">
            Углеводы, г
          </p>
          <p className="text text_type_digits-default text_color_inactive">
            {ingredient.carbohydrates}
          </p>
        </li>
      </ul>
    </div>
  );
};

export default IngredientDetails;

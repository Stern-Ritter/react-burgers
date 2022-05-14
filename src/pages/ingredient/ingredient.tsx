import React, { useMemo, FunctionComponent } from "react";
import { useSelector } from "../../types";
import { useParams } from "react-router-dom";
import IngredientDetails from "../../components/ingredient-details/ingredient-details";
import styles from "./ingredient.module.css";

interface IIngredientProps {
  type?: string;
}

interface IIngredientParams {
  id: string;
}

const Ingredient: FunctionComponent<IIngredientProps> = ({ type }) => {
  const { id } = useParams<IIngredientParams>();
  const ingredientsData = useSelector((store) => store.ingredients.data);

  const selectedIngredient = useMemo(() => {
    return ingredientsData.find((el) => el._id === id);
  }, [ingredientsData, id]);

  return (
    <>
      {selectedIngredient &&
        (type === "modal" ? (
          <IngredientDetails ingredient={selectedIngredient} />
        ) : (
          <div className={styles.container + " pt-30"}>
            <h1 className={styles.title + " text text_type_main-large"}>
              Детали ингредиента
            </h1>
            <IngredientDetails ingredient={selectedIngredient} />
          </div>
        ))}
    </>
  );
};

export default Ingredient;

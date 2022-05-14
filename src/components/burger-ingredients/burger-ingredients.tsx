import React, { useRef, useMemo, useState } from "react";
import { useSelector } from "../../types";;
import { useHistory, useLocation } from "react-router-dom";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import BurgerIngredient from "../burger-ingredient/burger-ingredient";
import styles from "./burger-ingredients.module.css";

function BurgerIngredients() {
  const location = useLocation();
  const history = useHistory();

  const ingredientsData = useSelector((store) => store.ingredients.data);
  const ingredients = useSelector((store) => store.constructorIngredients);

  const [currentCategory, setCurrentCategory] = useState("bun");
  const categories = useMemo(
    () => ({
      bun: {
        name: "Булки",
        ingredients: ingredientsData.filter(
          (ingredient) => ingredient.type === "bun"
        ),
      },
      sauce: {
        name: "Соусы",
        ingredients: ingredientsData.filter(
          (ingredient) => ingredient.type === "sauce"
        ),
      },
      main: {
        name: "Начинки",
        ingredients: ingredientsData.filter(
          (ingredient) => ingredient.type === "main"
        ),
      },
    }),
    [ingredientsData]
  );

  const ingredientsCount = useMemo(
    () =>
      [ingredients.bun, ...ingredients.main].reduce((res, ingredient) => {
        res[ingredient] = res[ingredient] ? res[ingredient] + 1 : 1;
        return res;
      }, {} as Record<string, number>),
    [ingredients]
  );

  const tabsRef = useRef<HTMLDivElement>(null);

  const categoriesRef = {
    bun: useRef<HTMLHeadingElement>(null),
    sauce: useRef<HTMLHeadingElement>(null),
    main: useRef<HTMLHeadingElement>(null),
  };

  const openHandler = (id: string) => {
    history.push({
      pathname: `/ingredients/${id}`,
      state: { background: location },
    });
  };

  const scrollHandler = () => {
    const tabsCoords = tabsRef.current?.getBoundingClientRect().bottom;
    const current = Object.entries(categoriesRef)
      .map(
        ([category, ref]) =>
          [
            category,
            Math.abs(
              (tabsCoords || 0) -
                (ref.current?.getBoundingClientRect().top || 0)
            ),
          ] as const
      )
      .sort((first, second) => first[1] - second[1])[0][0];
    setCurrentCategory(current);
  };

  const scrollToCategory = (category: string) => {
    categoriesRef[
      category as keyof typeof categoriesRef
    ].current?.scrollIntoView();
  };

  return (
    <section className=" pt-10">
      <h1 className={styles.title + " text text_type_main-large pb-5"}>
        Соберите бургер
      </h1>
      <div className={styles.tabs + " pb-10"} ref={tabsRef}>
        <Tab
          value="bun"
          active={currentCategory === "bun"}
          onClick={scrollToCategory}
        >
          Булки
        </Tab>
        <Tab
          value="sauce"
          active={currentCategory === "sauce"}
          onClick={scrollToCategory}
        >
          Соусы
        </Tab>
        <Tab
          value="main"
          active={currentCategory === "main"}
          onClick={scrollToCategory}
        >
          Начинки
        </Tab>
      </div>
      <ul className={styles.categories} onScroll={scrollHandler}>
        {Object.entries(categories).map(([type, { name, ingredients }]) => {
          return (
            <li key={type}>
              <h2
                className="text text_type_main-medium"
                ref={categoriesRef[type as keyof typeof categoriesRef]}
              >
                {name}
              </h2>
              <ul className={styles.ingredients + " pl-4 pr-4 pt-6 pb-10"}>
                {ingredients.map((ingredient) => (
                  <BurgerIngredient
                    ingredient={ingredient}
                    key={ingredient._id}
                    count={ingredientsCount[ingredient._id]}
                    openHandler={openHandler}
                  />
                ))}
              </ul>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

export default BurgerIngredients;

import React, { useState, useMemo } from "react";
import { useSelector, useDispatch } from "../../types";;
import { useDrop } from "react-dnd";
import { useHistory } from 'react-router-dom';
import {
  ConstructorElement,
  CurrencyIcon,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import BurgerConstructorItem from "../burger-constructor-item/burger-constructor-item";
import Modal from "../modal/modal";
import OrderDetails from "../order-details/order-details";
import BurgerConstructorStub from "../burger-constructor-stub/burger-constructor-stub";
import {
  postOrder,
  ADD_INGREDIENT,
  REMOVE_INGREDIENT,
} from "../../services/actions/burger-constructor";
import { getStorageItem } from "../../utils/storage";
import { refreshTokenKey } from "../../utils/constants";
import styles from "./burger-constructor.module.css";

const BurgerConstructor = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const ingredientsData = useSelector((store) => store.ingredients.data);
  const ingredients = useSelector((store) => store.constructorIngredients);

  const [{ isHover }, dropTarget] = useDrop({
    accept: "ingredient",
    drop(ingredient) {
      dispatch({ type: ADD_INGREDIENT, ingredient });
    },
    collect: (monitor) => ({
      isHover: monitor.isOver(),
    }),
  });

  const [visibleModal, setVisibleModal] = useState(false);
  const filteredBunIngredient = useMemo(
    () =>
      ingredientsData.filter(
        (ingredient) => ingredient._id === ingredients.bun
      ),
    [ingredientsData, ingredients]
  );

  function notUndefined<TValue>(value: TValue | undefined): value is TValue {
    return value !== undefined;
  }

  const filteredMainIngredients = useMemo(
    () =>
      ingredients.main
        .map((id) =>
          ingredientsData.find((ingredient) => ingredient._id === id)
        )
        .filter(notUndefined),
    [ingredientsData, ingredients]
  );

  const isConstructorEmpty = useMemo(
    () => filteredBunIngredient.length + filteredMainIngredients.length === 0,
    [filteredBunIngredient, filteredMainIngredients]
  );

  const orderCost = useMemo(
    () =>
      [
        ...filteredBunIngredient,
        ...filteredBunIngredient,
        ...filteredMainIngredients,
      ].reduce((sum, ingredient) => (sum += ingredient.price), 0),
    [filteredBunIngredient, filteredMainIngredients]
  );

  const submitOrder = async () => {
    if(getStorageItem(refreshTokenKey)) {
      setVisibleModal(true);
      dispatch(postOrder(ingredients));
    } else {
      history.push({ pathname : '/login'});
    }
  };

  const closeHandler = () => {
    setVisibleModal(false);
  };

  const deleteHandler = (idx: number) => {
    dispatch({ type: REMOVE_INGREDIENT, idx });
  };

  const containerClass = `${styles.constructor} ${
    isHover ? styles.onHover : ""
  }`;

  return (
    <section className="pt-25 pb-13">
      {isConstructorEmpty ? (
        <BurgerConstructorStub isHover={isHover} dropTarget={dropTarget} />
      ) : (
        <ul className={containerClass} ref={dropTarget}>
          {filteredBunIngredient.map((ingredient) => {
            return (
              <li className={styles.bun + " pl-4 pr-4"} key={ingredient._id}>
                <ConstructorElement
                  type="top"
                  isLocked={true}
                  text={ingredient.name + " (верх)"}
                  price={ingredient.price}
                  thumbnail={ingredient.image}
                />
              </li>
            );
          })}
          <li className={styles.ingredients}>
            <ul className={styles.list}>
              {filteredMainIngredients.map((ingredient, idx) => {
                return (
                  <BurgerConstructorItem
                    key={idx}
                    ingredient={ingredient}
                    idx={idx}
                    handleClose={deleteHandler}
                  />
                );
              })}
            </ul>
          </li>
          {ingredientsData
            .filter((el) => el._id === ingredients.bun)
            .map((ingredient) => {
              return (
                <li className={styles.bun + " pl-4 pr-4"} key={ingredient._id}>
                  <ConstructorElement
                    type="bottom"
                    isLocked={true}
                    text={ingredient.name + " (низ)"}
                    price={ingredient.price}
                    thumbnail={ingredient.image}
                  />
                </li>
              );
            })}
        </ul>
      )}
      <div className={styles.purchase + " pt-10"}>
        <div className={styles.total + " mr-10"}>
          <p className="text text_type_digits-medium mr-2">{orderCost}</p>
          <CurrencyIcon type="primary" />
        </div>
        <Button type="primary" size="medium" onClick={submitOrder}>Оформить заказ</Button>
      </div>
      {visibleModal && (
        <Modal closeHandler={closeHandler}>
          <OrderDetails></OrderDetails>
        </Modal>
      )}
    </section>
  );
}

export default BurgerConstructor;

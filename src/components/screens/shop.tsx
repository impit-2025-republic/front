import { useState } from "react";
import {
  useGetProducts,
  usePostProductsBuy,
  usePostProductsOpenCase,
} from "../../api/endpoints/b8st-api";
import { BronzeChestCard } from "../NewCase";
import {
  Dialog,
  DialogActions,
  DialogBody,
  DialogDescription,
  DialogTitle,
} from "../catalyst/dialog";
import { Field, Label } from "../catalyst/fieldset";
import { Input } from "../catalyst/input";
import { Button } from "../catalyst/button";
import CaseAnimation from "../case/Case";
import OpenCase from "../case/CaseOpen";

export const Shop = () => {
  const { data } = useGetProducts();
  const { mutate } = usePostProductsOpenCase();
  const { mutate: buy } = usePostProductsBuy();
  const [isOpen, setIsOpen] = useState(false);
  const [winItem, setWinItem] = useState(null);
  
  const onClick = (id) => {
    mutate(
      {
        data: {
          productId: id,
        },
      },
      {
        onSuccess(data) {
          if (data) {
            // Log the response to see what we're actually getting
            console.log("Open case response:", data);
            // Make sure we're using the correct property name and type
            const productId = data.productID || data.ProductID || data.id || data.ID;
            console.log("Setting winItem to:", productId);
            setWinItem(productId);
            setIsOpen(true);
          }
        },
      }
    );
  };
  
  const onBuy = (id) => {
    buy({
      data: {
        productId: id,
      },
    });
  };
  
  return (
    <div className="grid grid-cols-2 gap-2 mt-2">
      {data?.products?.map((data, index) => {
        return (
          <BronzeChestCard
            data={data}
            key={index}
            onBuy={() => {
              data.CaseTypeID !== null 
                ? onClick(data.ProductID) 
                : onBuy(data.ProductID);
            }}
          />
        );
      })}
      {/* Only render Dialog when isOpen is true AND winItem has a value */}
      {isOpen && (
        <Dialog open={isOpen} onClose={() => setIsOpen(false)}>
          <DialogTitle>Refund payment</DialogTitle>
          <DialogBody>
            {/* Check that winItem exists before rendering OpenCase */}
            {winItem && (
              <>
                <div>Debug - Selected Item ID: {JSON.stringify(winItem)}</div>
                <OpenCase selectedItemId={Number(winItem)} />
              </>
            )}
          </DialogBody>
          <DialogActions>
            <Button plain onClick={() => setIsOpen(false)}>
              Cancel
            </Button>
            <Button onClick={() => setIsOpen(false)}>Refund</Button>
          </DialogActions>
        </Dialog>
      )}
    </div>
  );
};

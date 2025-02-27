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
  DialogTitle,
} from "../catalyst/dialog";
import { Button } from "../catalyst/button";
import OpenCase from "../case/CaseOpen";

export const Shop = () => {
  const { data } = useGetProducts();
  const { mutate } = usePostProductsOpenCase();
  const { mutate: buy } = usePostProductsBuy();
  const [isOpen, setIsOpen] = useState(false);
  const [winItem, setWinItem] = useState(null);
  
  // @ts-ignore
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
            //@ts-ignore
            const productId = data.productID || data.ProductID || data.id || data.ID;
            console.log("Setting winItem to:", productId);
            setWinItem(productId);
            setIsOpen(true);
          }
        },
      }
    );
  };
  
  const onBuy = (id: any) => {
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
          //@ts-ignore  
          data={data}
            key={index}
            onBuy={() => {
          //@ts-ignore  
              data.CaseTypeID !== null 
          //@ts-ignore  
                ? onClick(data.ProductID) 
          //@ts-ignore  
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

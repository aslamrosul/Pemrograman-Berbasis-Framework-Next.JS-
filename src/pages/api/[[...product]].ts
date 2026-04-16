import type { NextApiRequest, NextApiResponse } from "next";
import {
  retrieveDataByID,
  retrieveProducts,
} from "../../utils/db/servicefirebase";

type Data = {
  status: boolean;
  status_code: number;
  data: any;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { product } = req.query;

  // Jika product adalah array dan memiliki elemen
  if (Array.isArray(product) && product.length > 0) {
    // Jika product[0] === "product" dan ada product[1], ambil detail produk
    if (product[0] === "product" && product[1]) {
      const data = await retrieveDataByID("products", product[1]);
      res.status(200).json({ status: true, status_code: 200, data });
      return;
    }
    // Jika hanya ada product[0] (bukan "product"), anggap itu ID
    else if (product[0] !== "product") {
      const data = await retrieveDataByID("products", product[0]);
      res.status(200).json({ status: true, status_code: 200, data });
      return;
    }
  }

  // Default: return all products
  const data = await retrieveProducts("products");
  res.status(200).json({ status: true, status_code: 200, data });
}
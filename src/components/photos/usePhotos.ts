import { useEffect, useState } from "react";
import Papa from "papaparse";

export interface PhotoRow {
  src: string;
  alt: string;
  link: string;
  row: string;
}

export default function usePhotos(csvUrl: string) {
  const [photos, setPhotos] = useState<PhotoRow[]>([]);
  const [grouped, setGrouped] = useState<PhotoRow[][]>([]);

  useEffect(() => {
    Papa.parse(csvUrl, {
      download: true,
      header: true,
      complete: (result) => {
        const rows = result.data as PhotoRow[];

        // group by row number
        const groups: { [key: string]: PhotoRow[] } = {};
        rows.forEach((item) => {
          if (!groups[item.row]) groups[item.row] = [];
          groups[item.row].push(item);
        });

        // convert object into array
        const groupArray = Object.keys(groups)
          .sort((a, b) => Number(a) - Number(b))
          .map((key) => groups[key]);

        setPhotos(rows);
        setGrouped(groupArray);
      },
    });
  }, [csvUrl]);

  return { photos, grouped };
}
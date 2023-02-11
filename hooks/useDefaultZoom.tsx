import {
  DEFAULT_ZOOM,
  localStorageKeys,
  DEFAULT_ZOOM_MOBILE,
} from "@/components/UI/Map/utils";
import { useDevice } from "@/stores/mapStore";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function useDefaultZoom() {
  const [defaultZoom, setDefaultZoom] = useState(DEFAULT_ZOOM);
  const device = useDevice();
  const router = useRouter();
  const { zoom } = router.query;

  const localCoordinatesURL = window.localStorage.getItem(
    localStorageKeys.coordinatesURL
  );

  useEffect(() => {
    const zoomFromQuery = Number(zoom);
    if (zoomFromQuery) {
      setDefaultZoom(zoomFromQuery);
      return;
    }

    const zoomParamFromURL = new URLSearchParams(localCoordinatesURL || "").get(
      "zoom"
    );
    if (zoomParamFromURL) {
      setDefaultZoom(parseFloat(zoomParamFromURL));
      return;
    }

    if (device == "mobile") {
      setDefaultZoom(DEFAULT_ZOOM_MOBILE);
    }
  }, []);

  return defaultZoom;
}

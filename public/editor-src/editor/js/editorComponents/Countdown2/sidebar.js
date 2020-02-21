import { toolbarBorderRadius } from "visual/utils/toolbar";
import { t } from "visual/utils/i18n";

export const title = t("Countdown");

export function getItems({ v, device }) {
  return [
    {
      id: "settingsTabs",
      devices: "desktop",
      type: "tabs",
      align: "start",
      tabs: [
        {
          id: "settingsStyling",
          label: t("Styling"),
          tabIcon: "nc-styling",
          options: [
            toolbarBorderRadius({
              v,
              device,
              state: "normal",
              devices: "desktop",
              onChangeGrouped: [
                "onChangeBorderRadiusGrouped",
                "onChangeBorderRadiusGroupedDependencies"
              ],
              onChangeUngrouped: [
                "onChangeBorderRadiusUngrouped",
                "onChangeBorderRadiusUngroupedDependencies"
              ]
            })
          ]
        }
      ]
    }
  ];
}

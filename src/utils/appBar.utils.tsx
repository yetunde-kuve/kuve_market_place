export class AppBarData {
  title?: string;
  subtitle: any;
  onBack?: Function;
  widgets?: any;
  metaData: any;
  showSearch?: boolean;
  widget?: any;

  constructor({
    title,
    subtitle,
    onBack,
    widgets,
    metaData = {},
    showSearch = false,
    widget,
  }: {
    title?: string;
    subtitle?: any;
    onBack?: Function;
    widgets?: any;
    metaData?: any;
    showSearch?: boolean;
    widget?: any;
  }) {
    this.title = title;
    this.subtitle = subtitle;
    this.onBack = onBack;
    this.widgets = widgets;
    this.metaData = metaData;
    this.showSearch = showSearch;
    this.widget = widget;
  }
}

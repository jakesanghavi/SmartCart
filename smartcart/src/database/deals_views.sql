create view
  public.price_by_itemdate_view as
select
  item_prices.id,
  item_prices.item_id,
  items.name,
  item_prices.store_id,
  stores.name as store_name,
  item_prices.price,
  item_prices.quantity,
  item_prices.unit,
  date (item_prices.datetime) as date,
  item_prices.image_url
from
  item_prices
  join items on item_prices.item_id = items.id
  join stores on item_prices.store_id = stores.id;

create view
  public.deals_track as
select distinct
  p_diff.id1 as curr_item_prices_id,
  p_diff.name as item_name,
  p_diff.item_quantity,
  p_diff.rounded_2 as item_price,
  p_diff.store_name,
  abs(p_diff.percent_diff) as percent_price_decrease,
  concat(
    round(
      (p_diff.date_to - p_diff.date_from)::numeric(5, 2) / 7::numeric,
      0
    ),
    ' weeks ago'
  ) as cheaper_than,
  p_diff.image_url
from
  (
    select
      p1.item_id as id1,
      p1.store_id,
      p1.store_name,
      p1.name,
      p1.quantity as item_quantity,
      p1.price::numeric(5, 2) as rounded_1,
      p2.price::numeric(5, 2) as rounded_2,
      p1.date as date_from,
      p2.date as date_to,
      (p2.price - p1.price)::numeric(5, 2) as difference,
      ((p2.price - p1.price) / p1.price)::numeric(5, 2) as percent_diff,
      "left" (p2.image_url, length(p2.image_url) - 1) as image_url
    from
      price_by_itemdate_view p1
      join price_by_itemdate_view p2 on p1.item_id = p2.item_id
      and p1.store_id = p2.store_id
      and p2.date > p1.date
      and p2.date <= (p1.date + 31)
    where
      p2.date = (
        (
          select
            max(price_by_itemdate_view.date) as max
          from
            price_by_itemdate_view
        )
      )
  ) p_diff
where
  p_diff.percent_diff <= '-0.1'::numeric
  and p_diff.name !~~ 'Original price:%'::text
order by
  (
    concat(
      round(
        (p_diff.date_to - p_diff.date_from)::numeric(5, 2) / 7::numeric,
        0
      ),
      ' weeks ago'
    )
  ),
  (abs(p_diff.percent_diff)) desc;


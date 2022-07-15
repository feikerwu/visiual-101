import React, { useEffect } from 'react';

import { hierarchy, pack } from 'd3-hierarchy';

async function getData() {
  const dataSource = 'https://s5.ssl.qhres2.com/static/b0695e2dd30daa64.json';
  const data = await (await fetch(dataSource)).json();

  return data;
}

async function processData() {
  const data = await getData();

  const regions = hierarchy(data)
    // 计算当前节点下所有儿子节点以及当前节点的个数
    .sum(d => 1)
    .sort((a, b) => (a.value || 0) - (b.value || 0));

  const packData = pack().size([1600, 1600]).padding(3);

  const root = packData(regions);
  debugger;
}

const Hierarchy = () => {
  useEffect(() => {
    processData();
  }, []);

  return <div></div>;
};

export default Hierarchy;

# three-vector-auto-clone

`THREE.Vector3`の`add()`等を利用したTypeScriptコンパイル時に、自動で`clone()`を付与する。

## 使用環境
- three.js
- TypeScript
- webpack
- ts-loader

## 対象
`import * as THREE from 'three'` している前提

### Files
エントリーポイント以下のファイル (node_modules等は含まれない)

### Types
- THREE.Vector2
- THREE.Vector3
- THREE.Vector4

### Methods
`setXX`を除いた、上記Typeのthisを返すメソッド全て

## 動作の流れ
1. npm prebuildで`threeVectorCloneTransformer.ts`からjsを適当に生成する
2. ts-loaderがcustom transformerとして呼んでくれるので、対象の`PropertyAccessExpression`が来たら`clone()`を挟むようにnodeを改変して返す。
3. `THREE.Vector3`の`add()`等を利用した部分のjs出力に`clone()`が追加される。

## 参考資料
- [ts-loader/test/comparison-tests/customTransformer/](https://github.com/TypeStrong/ts-loader/tree/master/test/comparison-tests/customTransformer)

## LICENCE
The MIT Licence.

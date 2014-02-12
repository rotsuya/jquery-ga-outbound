# jquery-ga-outbound

Google Analyticsの新しいトラッキングコード(ユニバーサルアナリティクス、analytics.js)で、
外部リンクをカスタムイベントとして記録するための、jQueryプラグインです。

## 使い方

jQueryとこのプラグインを`script`タグで読み込んでください。

リンクを補足したいjQueryオブジェクトに対して、`outbound()`メソッドを呼び出してください。
引数に、JavaScriptオブジェクトの形式で、オプションを指定することができます。

## デモ

[jquery-ga-outbound Demo](http://rotsuya.github.io/jquery-ga-outbound)

## オプション

* int `timeout`
 * Google Analyticsから応答がない場合に、タイムアウトして画面遷移する時間をミリ秒で指定します。
デフォルト値は`250`です。
* bool `permitSameOrigin`
 * リンク先が同一オリジンの場合はカスタムイベントを記録しませんが、強制的に記録したい場合は`true`を指定します。
デフォルト値は`false`です。
* bool `debug`
 * デバッグモードを指定します。コンソールにデバッグ情報を出力したい場合は`true`を指定します。
デフォルト値は`false`です。

## 例

```javascript
<a href="http://www.google.com/" class="outbound">Google</a>
<script src="jquery-1.10.2.min.js"></script>
<script src="jquery-ga-outbound.js"></script>
<script>
    var $a = $('a.outbound').gaOutbound({debug: true;});
    console.log('attached event to ' + $a.length + ' elements.');
</script>
```
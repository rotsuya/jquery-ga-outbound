# jquery-ga-outbound

Google Analyticsの新しいトラッキングコード(ユニバーサルアナリティクス、analytics.js)で、
外部リンクをカスタムイベントとして記録するための、jQueryプラグインです。

## 使い方

1. jQueryとこのプラグインを`<script>`タグで読み込んでください。
1. リンクを補足したいjQueryオブジェクトに対して、`$.fn.gaOutbound()`メソッドを呼び出してください。
引数に、JavaScriptオブジェクトの形式で、オプションを指定することができます。

## カスタムイベントのログの確認方法

1. Google Analyticsで行動➔イベント➔上位のイベントをクリックします。
1. イベントカテゴリに表示される、"Outbound Links"をクリックします。
外部リンクのクリック数が、URL別に表示されます。
1. プライマリディメンションの「イベントラベル」をクリックします。
外部リンクのクリック数が、リンク文字列別に表示されます。

## デモ

[jquery-ga-outbound Demo](http://rotsuya.github.io/jquery-ga-outbound)
コンソールで動作を確認することができます。

## オプション

* `timeout` (int)
 * Google Analyticsから応答がない場合に、タイムアウトして画面遷移する時間をミリ秒で指定します。
デフォルト値は`250`です。
* `permitSameOrigin` (bool)
 * 同一オリジンの場合はカスタムイベントを記録しませんが、強制的に記録したい場合のみ`true`を指定します。
デフォルト値は`false`です。
* `debug` (bool)
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
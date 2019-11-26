// 噂好きのアンバー婦人
export const amber = async (scene, chara) => {
  if (chara.nextMessages) return await scene.talk(chara.nextMessages)
  const state = scene.storage.state.event.town.amber
  if (!state.includes(0)) {
    await scene.talk([
      { chara, text: 'TODO' }
    ])
    chara.nextMessages = [
      { chara, text: 'TODO' }
    ]
    state.push(0)
  } else {
    await scene.talk([
      { chara, text: 'TODO' }
    ])
  }
}

// 宿屋のアナベル
export const annabelle = async (scene, chara) => {
  if (chara.nextMessages) return await scene.talk(chara.nextMessages)
  const state = scene.storage.state.event.town.annabelle
  if (!state.includes(0)) {
    await scene.talk([
      { chara, text: '旅人さんこんにちは。' },
      { chara, text: '今夜の宿はお決まりかしら？' },
      { chara, text: 'よかったらうちに泊まっていってね。' },
      { chara: 'ann', text: 'ありがとう。' },
      { chara: 'ann', text: 'でも宿はもうとってあるんだ。' },
      { chara, text: 'そっか、' },
      { chara, text: 'でもうちは、そのへんの宿よりもっとイイよ。' },
      { chara: 'ann', text: 'そうなの？' },
      { chara, text: 'ちょっと、というかかなり高めだけれど、' },
      { chara, text: 'いっぱいサービスするわ。' },
      { chara: 'ann', text: '高級な宿ってこと？' },
      { chara: 'ann', text: 'ちょっとそういう感じには見えないけどな…。' },
      { chara, text: 'そういうことじゃないよ。' },
      { chara, text: '私のサービスは女の子専門なんだけど…、' },
      { chara, text: 'お姉さんには馴染みがなかったかな？' },
      { chara: 'ann', text: '？' },
      { chara: 'jaquelyn', text: 'ありがとう、宿屋さん。' },
      { chara: 'jaquelyn', text: '間に合ってるから、結構よ。' },
      { chara, text: 'そう。' },
      { chara, text: '気が向いたら来てね。' }
    ])
    chara.nextMessages = [{ chara, text: '気が向いたら来てね。' }]
    state.push(0)
  } else {
    await scene.talk([
      { chara, text: '今日もいい天気ですね。' }
    ])
  }
}
// 内気なマチルダ
export const matilda = async (scene, chara) => {
  if (chara.nextMessages) return await scene.talk(chara.nextMessages)
  const state = scene.storage.state.event.town.matilda
  if (!state.includes(0)) {
    await scene.talk([
      { chara: 'ann', text: 'こんにちは。' },
      { chara: 'ann', text: 'キミはこんな建物の影で何してるの？' },
      { chara, text: 'あ、そ、そうだよね。怪しいよね…。' },
      { chara, text: 'えっと、そこにいる宿屋のアナベルを見張っているの。' },
      { chara, text: '悪いことしないように。' },
      { chara: 'ann', text: '悪い子なの？' },
      { chara, text: 'ううん。とっても良い子よ。' },
      { chara, text: '昔よく遊んだから…。' },
      { chara: 'ann', text: 'じゃあどうして？' },
      { chara, text: 'なんか、最近怪しいお仕事してるみたいなの。' },
      { chara, text: 'それで…、心配で…。' },
      { chara: 'ann', text: 'じゃあ直接止めに行けばいいじゃん。' },
      { chara: 'ann', text: '仲良かったんだよね？' },
      { chara, text: 'そうなんだけど…、' },
      { chara, text: 'なんか最近話しかけるのが恥ずかしくなっちゃって…、' },
      { chara, text: 'なんでかな…。' },
      { chara: 'ann', text: 'そうなんだぁ。' },
      { chara: 'ann', text: 'まあそういうときもあるさ。' },
      { chara: 'ann', text: 'きっとまたそのうち仲良くできると思うよ。' },
      { chara, text: 'そうなのかな…。ありがとう。' }
    ])
    chara.nextMessages = [
      { chara, text: 'アナベル、すごく良い子なの。' },
      { chara, text: 'また昔みたいに仲良くしたいな…。' }
    ]
    state.push(0)
  } else {
    await scene.talk([
      { chara, text: 'アナベル、今日も綺麗でいいな…。' }
    ])
  }
}

// 卑劣なエリオット
export const elliott = async (scene, chara) => {
  if (chara.nextMessages) return await scene.talk(chara.nextMessages)
  const state = scene.storage.state.event.town.elliott
  if (!state.includes(0)) {
    await scene.talk([
      { chara, text: 'あんた、どっから来た旅人さんか知らんが、金には不自由してなさそうだな。' },
      { chara, text: 'なあ、俺にちょっと金を預けてみないか？' },
      { chara, text: 'いい儲け話を手に入れたんだが、それをするための元手がないんだ。' }
    ])
    const i = await scene.select(['はい', 'いいえ'])
    await scene.talk([
      ...(i === 0 ? [
          { chara: 'francisca', text: 'やめなさいよ、アン。' },
          { chara: 'ann', text: 'でも儲かるみたいだよ？' },
          { chara: 'francisca', text: 'バカね。とにかくダメ。' }
        ] : []
      ),
      { chara, text: 'ちっ、' }
    ])
    chara.nextMessages = [{ chara, text: '気は変わらないか？' }]
    state.push(0)
  } else {
    await scene.talk([
      { chara, text: '調子はどうだ？' },
      { chara, text: '何か良い儲け話があったら教えてくれ。' }
    ])
  }
}

// 賞金稼ぎのマックス
export const max = async (scene, chara) => {
  if (chara.nextMessages) return await scene.talk(chara.nextMessages)
  const state = scene.storage.state.event.town.max
  if (!state.includes(0)) {
    await scene.talk([
      { chara: 'ann', text: 'エドガー王ってどんな人ですか？' },
      { chara, text: 'どんな人かって、エドガー王はみんなの英雄だ。' },
      { chara, text: '誰もが王を尊敬している。' },
      { chara: 'francisca', text: '王国を襲った竜を倒したって聞きました。' },
      { chara, text: 'その通り、この国の民ならみんな知っていることだ。' },
      { chara, text: '十年近く昔の話だが、王は王国まで飛んできた竜と直接戦った。' },
      { chara, text: '殺したわけではないが、追い払って、グリファルデ神殿に封じた。' },
      { chara: 'ann', text: '強いんですね。' },
      { chara, text: 'ああ。エドガー王が即位してからこの国はずっと平和だ。' },
      { chara: 'jaquelyn', text: 'だから〈平和王〉なんですね。' },
      { chara, text: 'そうだ。' }
    ])
    chara.nextMessages = [{ chara, text: 'エドガー王が即位してからこの国はずっと平和だ。' }]
    state.push(0)
  } else {
    await scene.talk([
      { chara, text: 'よお、元気かい？' }
    ])
  }
}
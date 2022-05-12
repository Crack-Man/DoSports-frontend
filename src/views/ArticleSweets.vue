<template>
    <div class="">
        <header-main/>
        <v-container>
            <div class="article-header">
                <img :src="require('@/assets/img/png/article-header--sweets.png')">
            </div>
            <div class="divider"></div>
            <div class="article-container">
                <div class="article-content">
                    <div class="article-banner">
                        <span>Если вам постоянно хочется сладкого, стоит задуматься — причина может быть далеко не безобидная.</span>
                    </div>
                    <div class="text">
                        <p>Сила воли и мотивация не всегда спасают от тяги к сладостям — даже рьяные ЗОЖники и сторонники правильного питания срываются. Так почему же такие неполезные продукты столь желанны для нас? </p>
                        <br>
                        <p>Тому могут быть несколько причин, далеко не безобидных. Но определив ту, которая именно у вас вызывает тягу к сладкому, вы можете не только решить проблему, но и подправить здоровье.</p>

                        <h1>1. Нарушение кровообращения</h1>
                        <p>Первое, на что стоит обратить внимание — состояние здоровья. Из-за нарушения кровоснабжения в головном мозгу орагнизму может не хватать глюкозы — вот он и требует сладенького.</p>
                        <br>
                        <p><span class="selected-text">Причины:</span> сотрясение мозга, остеохондроз или гипотония.</p>
                        <br>
                        <p>Если головную боль вы легко снимаете конфеткой, значит случай ваш. Обратитесь к терапевту или сразу неврологу, устраните причину, и сладости перестанут манить с каждой витрины.</p>

                        <h1>2. Недостаток хрома</h1>
                        <p>Хром поддерживает нормальный уровень глюкозы в крови и снижает зависимость от сахара. А вот переизбыток сахара вымывает этот полезный минерал из организма. То есть при его недостатке и злоупотреблении сладким хрома становится еще меньше, а к сладкому тянет еще больше.</p>
                        <br>
                        <p>Чтобы прервать этот порочный круг, налегайте на продукты, богатые хромом. Кушайте рыбу, печень, брокколи, свеклу. Добавляйте в блюда пивные дрожжи. Также принимайте специальные витаминно-минеральные комплексы, но только по назначению врача. Помните, что не только дефицит, но и переизбыток хрома вреден.</p>
                        <br>
                        <p><span class="selected-text">Основные симптомы нехватки хрома:</span> постоянное чувство голода, обильное потоотделение, хроническая усталость, головокружение. При их наличии обратитесь к специалисту.</p>

                        <h1>3. Недостаток магния</h1>
                        <p>Если тянет именно на шоколад, шоколадные конфеты, шоколадный мусс, шоколадные пирожные и прочие сладости с или на основе шоколада, скорее всего, организму не хватает еще одного важного элемента — магния.</p>
                        <br>
                        <p>Для его восполнения его нехватки лучше вместо сладостей кушайте зелень, капусту, авокадо, орехи, семечки, морскую рыбу. Пейте минеральную воду с высоким содержанием магния.</p>
                        <br>
                        <p><span class="selected-text">Основные симптомы недостатка магния:</span> кроме тяги к шоколаду, это еще и головная боль, слабость, усталость. Обнаружив у себя эти симптомы, лучше сразу обратиться к врачу. Он скорректирует меню и назначит необходимые препараты.</p>

                        <h1>4. Инсулинорезистентность</h1>
                        <p>Инсулин — гормон, который вырабатывается поджелудочной железой и отвечает за уровень сахара в крови. Когда глюкозы в крови становится много, инсулин помогает доставить ее в клетки для выработки организмом энергии.</p>
                        <br>
                        <p>При инсулиновой резистентности происходит сбой: инсулин вырабатывается, однако глюкоза в клетки проникнуть не может, поскольку становятся устойчивыми к его действию. Чтобы удержать уровень сахара в крови в норме, поджелудочная начинает вырыбатывать еще больше инсулина.</p>

                        <div class="quote">
                            <div class="quote-opened">
                                <img :src="require('@/assets/img/png/quote-opened.png')">
                            </div>
                            <span>При инсулиновой резистентности происходит сбой: инсулин вырабатывается, однако глюкоза в клетки проникнуть не может</span>
                            <div class="quote-closed">
                                <img :src="require('@/assets/img/png/quote-closed.png')">
                            </div>
                        </div>

                        <p>Со временем это приводит к тому, что поджелудочная оказывается не в состоянии вырабатывать инсулин в таком количестве, чтобы все-таки доставить глюкозу в клетки. В результате они испытывают энергетический голод, который организм требует восполнить — и быстрые углеводы, они же сладости, лучший для него вариант.</p>
                        <br>
                        <p>Если вы подозреваете, что причиной вашей тяги к сладкому могут быть проблемы с инсулинорезистентностью — бегом к врачу-эндокринологу, иначе вы рискуете заработать сахарный диабет 2 типа!</p>

                        <h1>5. Психологическая зависимость</h1>
                        <p>Ну а если первые четыре причины — не ваш случай, скорее всего, зависимость от сладкого психологическая. Уж не знаю, поздравлять или сочувствовать.</p>
                        <br>
                        <p>Привычка радовать себя сладким или, напротив, заедать им стресс, привычка перекусывать конфетами, привычка заканчивать прием пищи сладким — все это в итоге выливается в зависимость от сладкого.</p>
                        <br>
                        <p>Тут остается взять в себя в руки и действовать.</p>
                    </div>
                </div>
                <div class="sidebar">
                    <banner-vertical/>
                    <div class="reference">
                        <div>Источник информации:</div>
                        <a href="https://tsn.ua/ru/blogi/themes/health_sport/5-sposobov-poborot-tyagu-k-sladkomu-1249425.html">5 основных причин, почему нам хочется сладкого</a>
                    </div>
                </div>
            </div>
        </v-container>
        <footer-main/>
    </div>
</template>

<script>
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BannerVertical from "@/components/BannerVertical";

export default {
    name: "ArticleSweets",

    components: {
        "header-main": Header,
        "banner-vertical": BannerVertical,
        "footer-main": Footer
    },
}
</script>

<style lang="scss">
#app {
    .article-header {
        width: 100%;
        margin-top: 35px;

        img {
            display: block;
            width: 100%;
        }
    }

    .divider {
        margin: 40px 0;
        width: 100%;
        height: 1px;
        border: 1px solid #B5B5B8;
    }

    .article-container {
        display: flex;

        .article-content {
            flex: 0 0 730px;

            .article-banner {
                width: 100%;
                height: 103px;
                border-radius: 5px;

                display: flex;
                align-items: center;
                justify-content: center;

                span {
                    width: 644px;
                    font-family: 'Inter-SemiBold', sans-serif;
                    font-style: italic;
                    font-size: 22px;
                    line-height: 135%;
                }
            }

            .text {
                margin-top: 40px;
                p {
                    font-family: 'Inter-Regular', sans-serif;
                    font-size: 18px;
                    line-height: 145%;
                    margin-bottom: 0;
                }

                h1 {
                    margin-top: 45px;
                    margin-bottom: 15px;

                    font-family: 'Inter-Bold', sans-serif;
                    font-size: 32px;
                    line-height: 145%;
                }

                .quote {
                    margin: 50px 0;
                    padding: 78px 0;
                    width: 100%;
                    position: relative;

                    display: flex;
                    align-items: center;
                    justify-content: center;

                    .quote-opened, .quote-closed {
                        width: 40px;
                        position: absolute;

                        img {
                            display: block;
                            width: 100%;
                        }
                    }

                    .quote-opened {
                        top: 0;
                        left: 0;
                    }

                    .quote-closed {
                        bottom: 0;
                        right: 0;
                    }

                    span {
                        width: 578px;
                        height: 105px;
                        font-family: 'Inter-SemiBold', sans-serif;
                        font-style: italic;
                        font-size: 24px;
                        line-height: 145%;
                        text-align: center;
                    }
                }
            }
        }
    }

    .sidebar {
        margin-left: 125px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;

        div {
            font-family: 'Inter-Medium', sans-serif;
            font-size: 18px;
            line-height: 145%;
        }

        a {
            margin-top: 5px;
            display: block;
            font-family: 'Inter-Regular', sans-serif;
            font-size: 18px;
            line-height: 145%;
        }
    }
}

#app.dark {
    .article-container {
        .article-banner {
            background: #4C53FF;
        }

        .sidebar {
            a:hover {
                color: #9196FF !important;
            }
        }
    }
}

</style>